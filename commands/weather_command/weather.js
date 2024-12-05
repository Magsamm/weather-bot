// This script sets up a 'weather' command for a Discord bot using discord.js.
// The command allows users to get weather information for a specified city.
// It includes a cooldown mechanism to limit how often a user can invoke the command.
// Additionally, it uses a caching system to store and reuse weather data, reducing the need for repeated API calls.

const { SlashCommandBuilder } = require("discord.js");
const fetch = require("node-fetch");
const cityCoordinates = require("../../utility/cityCoordinates.js");
const interpretSymbolCode = require("../../utility/WeatherConditions.js");
const cooldowns = new Map();
const cooldownTime = 60000;
const weatherCache = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Get weather information for a city")
    .addStringOption((option) =>
      option
        .setName("city")
        .setDescription("The name of the city")
        .setRequired(true)
    ),

  // Main command execution function for the 'weather' command
  async execute(interaction) {
    const city = interaction.options.getString("city").toLowerCase();

    // handle cooldown of the bot, and notify if user is still on cooldown with time remaining, else resets.
    if (cooldowns.has(interaction.user.id)) {
      const expirationTime = cooldowns.get(interaction.user.id) + cooldownTime;
      if (Date.now() < expirationTime) {
        const remainingTime = (expirationTime - Date.now()) / 1000;
        await interaction.reply(
          `You're on cooldown! Please wait ${remainingTime.toFixed(1)} seconds.`
        );
        return;
      }
    }

    cooldowns.set(interaction.user.id, Date.now());

    try {
      if (!cityCoordinates[city]) {
        await interaction.reply(
          `Weather information for ${city} is not available.`
        );
        return;
      }

      const { latitude, longitude } = cityCoordinates[city];

      const yrNoApiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;

      // cache responses
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
      const headers = {};
      const cachedData = weatherCache.get(city);
      if (cachedData && cachedData.lastModified) {
        headers["If-Modified-Since"] = cachedData.lastModified;
      }

      // user agent for indentification, supply legit email when testing/in use.
      const response = await fetch(yrNoApiUrl, {
        method: "GET",
        headers: {
          headers,
          "User-Agent": "metrologen/1.0 (example@hotmail.com)",
        },
      });

      // If there's no change, the server will send the HTTP 304 response code. The HTTP status code 304 means Not Modified
      // the web page you requested hasn't changed since the last time you accessed it.
      // After that, your browser will retrieve the cached version of the web page in your local storage.
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since
      if (response.status === 304) {
        const cachedWeather = cachedData.weatherData;
        const formattedWeather = formatWeatherData(
          cachedWeather.properties.timeseries[0].data
        );
        await interaction.reply(
          `Weather for ${city} (cached):\n${formattedWeather}`
        );
        return;
      }
      // if response not ok, return error
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const weatherData = await response.json();

      if (response.headers.has("Last-Modified")) {
        // Cache the weather data along with the 'Last-Modified' header value
        // This helps in optimizing future requests using conditional GET requests
        weatherCache.set(city, {
          weatherData,
          lastModified: response.headers.get("Last-Modified"),
        });
      }

      // Format the weather data for a user-friendly response
      // The function 'formatWeatherData' takes the relevant part of the weather data
      // and converts it into a readable string format.
      const formattedWeather = formatWeatherData(
        weatherData.properties.timeseries[0].data
      );
      // Reply to the Discord interaction with the formatted weather information
      await interaction.reply(`Weather for ${city}:\n${formattedWeather}`);
    } catch (error) {
      // If an error occurs (e.g., network issues, invalid responses),
      // log the error to the console for debugging and inform the user
      console.error("Error fetching weather data:", error);
      await interaction.reply("Failed to fetch weather data.");
    }
  },
};

// get weather data and return it
function formatWeatherData(data) {
  // Extract temperature from the data
  const temperature = data.instant.details.air_temperature;
  // Extract weather condition code for the next 1 hour from the data
  const conditionCode = data.next_1_hours.summary.symbol_code;
  // Convert the condition code to a human-readable format using interpretSymbolCode function
  const weatherCondition = interpretSymbolCode(conditionCode);
  // Return a string combining temperature and weather condition for display
  return `Temperature: ${temperature}°C\nCondition: ${weatherCondition}`;
}
