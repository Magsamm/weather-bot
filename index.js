/*This section of code is mainly about setting up the command structure and importing necessay utilities and modules for the 'weather' command in the Discord bot. 
It defines the command, its description, and its options using the SlashCommandBuilder. 
It also sets up cooldown and caching mechanisms to manage the command's usage efficiently. */

const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json'); // Import bot token from config file

// Initialize a new Discord client with the specified intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Create a new Collection to store the bot's commands
client.commands = new Collection();

// Grab all the command folders from the commands directory 
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each folder in the 'commands' directory
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	
	// Loop through each command file in the current folder
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		
	// Add the command to the client's command collection if it has both 'data' and 'execute' properties
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// Read all event files from the 'events' directory
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Loop through each event file
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	// Register the event with the client
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with the bot's token
client.login(token);
