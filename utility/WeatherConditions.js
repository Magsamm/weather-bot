// this file takes weather conditioons and returns them into a more readable form when requested via the bot.
// https://github.com/nrkno/yr-weather-symbols/blob/master/src/index.ts
function interpretSymbolCode(symbolCode) { 
    console.log("Received symbol code:", symbolCode); // // debug in case of missing weather condition 

    /* This segment defines an object called iconMappings. 
    Each property of this object represents a different weather condition code, 
    and the value for each property is the human-readable text description of that condition. */
    const iconMappings = {
        partlycloudy_day: 'partly cloudy, day',
        cloudy: 'cloudy',
        clearsky_night: 'clear sky, night',
        fair_night: 'fair, night',
        fair_day: 'fair, day',
        partlycloudy_night: 'partly cloudy, night',
        clearsky_day: 'clear sky, day',
        rainshowers_polartwilight: 'rainshowers polar, twilight',
        rainshowersandthunder_day: 'rainshowers and thunder, day',
        rainshowersandthunder_night: 'rainshowers and thunder, night',
        rainshowersandthunder_polartwilight: 'rainshowers and thunder polar, twilight',
        sleetshowers_day: 'sleetshowers, day',
        sleetshowers_night: 'sleetshowers, night',
        sleetshowers_polartwilight: 'sleetshowers polar, twilight',
        snowshowers_day: 'snow showers, day',
        snowshowers_night: 'snow showers, night',
        snowshowers_polartwilight: 'snow showers, polar twilight',
        rain: 'rain',
        heavyrain: 'heavy rain',
        heavyrainandthunder: 'heavy rain and thunder',
        sleet: 'sleet',
        snow: 'snow',
        snowandthunder: 'snow and thunder',
        fog: 'fog',
        sleetshowersandthunder_day: 'sleet showers and thunder, day',
        sleetshowersandthunder_night: 'sleet showers and thunder, night',
        sleetshowersandthunder_polartwilight: 'sleet showers and thunder polar, twilight',
        snowshowersandthunder_day: 'snow showers and thunder, day',
        snowshowersandthunder_night: 'snow showers and thunder, night',
        snowshowersandthunder_polartwilight: 'snowshowers and thunder polar, twilight',
        rainandthunder: 'rain and thunder',
        sleetandthunder: 'sleet and thunder',
        lightrainshowersandthunder_day: 'light rain showers and thunder, day',
        lightrainshowersandthunder_night: 'light rain showers and thunder, night',
        lightrainshowersandthunder_polartwilight: 'light rain showers and thunder polar, twilight',
        heavyrainshowersandthunder_day: 'heavy rain showers and thunder, day',
        heavyrainshowersandthunder_night: 'heavy rain showers and thunder, night',
        heavyrainshowersandthunder_polartwilight: 'heavy rainshowers and thunder polar, twilight',
        lightssleetshowersandthunder_day: 'lights sleetshowers and thunder, day',
        lightssleetshowersandthunder_night: 'lights sleet showers and thunder, night',
        lightssleetshowersandthunder_polartwilight: 'lights sleet showers and thunder polar, twilight',
        heavysleetshowersandthunder_day: 'heavy sleet showers and thunder, day',
        heavysleetshowersandthunder_night: 'heavy sleet showers and thunder, night',
        heavysleetshowersandthunder_polartwilight: 'heavy sleet showers and thunder polar, twilight',
        lightssnowshowersandthunder_day: 'lights snow showers and thunder, day',
        lightssnowshowersandthunder_night: 'lights snow showers and thunder, night',
        lightssnowshowersandthunder_polartwilight: 'lights snow showers and thunder polar, twilight',
        heavysnowshowersandthunder_day: 'heavy snow showers and thunder, day',
        heavysnowshowersandthunder_night: 'heavy snow showers and thunder, night',
        heavysnowshowersandthunder_polartwilight: 'heavy snow showers and thunder polar, twilight',
        lightrainandthunder: 'light rain and thunder',
        lightsleetandthunder: 'light sleet and thunder',
        heavysleetandthunder: 'heavy sleet and thunder',
        lightsnowandthunder: 'light snow and thunder',
        heavysnowandthunder: 'heavy snow and thunder',
        lightrainshowers_day: 'light rainshowers, day',
        lightrainshowers_night: 'light rainshowers, night',
        lightrainshowers_polartwilight: 'light rain showers polar twilight',
        heavyrainshowers_day: 'heavy rain showers, day',
        heavyrainshowers_night: 'heavy rain showers, night',
        heavyrainshowers_polartwilight: 'heavy rain showers polar, twilight',
        lightsleetshowers_day: 'light sleet showers, day',
        lightsleetshowers_night: 'light sleet showers, night',
        lightsleetshowers_polartwilight: 'light sleet showers polar, twilight',
        heavysleetshowers_day: 'heavy sleet showers, day',
        heavysleetshowers_night: 'heavy sleet showers, night',
        heavysleetshowers_polartwilight: 'heavy sleet showers polar, twilight',
        lightsnowshowers_day: 'light snow showers, day',
        lightsnowshowers_night: 'light snows howers, night',
        lightsnowshowers_polartwilight: 'light snow showers polar, twilight',
        heavysnowshowers_day: 'heavy snow showers, day',
        heavysnowshowers_night: 'heavy snow showers, night',
        heavysnowshowers_polartwilight: 'heavy snow showers polar, twilight',
        lightrain: 'light rain',
        lightsleet: 'light sleet',
        heavysleet: 'heavy sleet',
        lightsnow: 'light snow',
        heavysnow: 'heavy snow',
    };
    /* Here, the function looks up the symbolCode in the iconMappings object. 
    If the symbolCode is found, the corresponding human-readable text is returned. 
    If the symbolCode is not found in iconMappings, the function returns 'Unknown'. */
    const weatherCondition = iconMappings[symbolCode] || 'Unknown';
    return weatherCondition;
}

module.exports = interpretSymbolCode;