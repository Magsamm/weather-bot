# The metrologen discord bot!

#### Video Demo: <URL HERE>

#### Description:

This discord lets you query for weather updates using discord.js and the yr.no MET API in your discord server!

# software required for the bot to run

make sure to have the following installed:
discord.js using: npm install discord.js
node version > 16.11.0 or higher: https://nodejs.org/en/download, or using npm or some other package manager for node
node-fetch: npm i node-fetch

# Basic usage:

IMPORTANT: Invite the bot to your server with the following permissions:
bot, applications.commands.

# Example on how to run the bot from the commandline:

cd into the root directory of your bot:
cd /home/user/documents/projectfolder.

Then type the following into the commandline: node index.js
Then in the discord server the bot is in, run: /weather new york
This will return temperature and weather conditions in celsius.

# Explanation of files and structure

## index.js:

The index is the root file of the project.
its purpose is to setup the necessary structure for the rest of the bot.
set require for the dependencies to import that the project needs to run:

it stores the collection of commands that the user can use to get some weather updates.
it reads the contents of the command folder and loops through them for any .js files, in this case its weather.js. If no such file is found, the app return an error.

node.js is event driven. Which means it executes code when an event occurs.
There are 2 files in the events folder that gets read, interactionsCreate.js and ready.js

Once these files are found, it registers it with the client and the bot is almost ready for use.
lastly there is client.login(token), which is a function that reads the token string in config.json, and then its ready for use!

## interactionCreate.js:

event that listens for, in our case, a chat command from the user called 'weather'. If its not, and error will be returned, and a console.log statement is outputted.

## deploy-commands.js:

this file registers and updates the slash commands for the bot.

## ready.js

If the client is ready, you'll get a console message saying the bot is logged in as metrologen#xxxx

## config.json:

stores token, clientID and alternatively guildID(the ID of the development server discord you use to develop and test the bot).

## weather.js

This script sets up a 'weather' command for a Discord bot using discord.js.
The command allows users to get weather information for a specified city.
It includes a cooldown mechanism to limit how often a user can invoke the command.
Additionally, it uses a caching system to store and reuse weather data, reducing the need for repeated API calls.
