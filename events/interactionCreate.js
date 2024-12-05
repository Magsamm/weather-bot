const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate, // Name of the event this module will handle, in this case, InteractionCreate.
	async execute(interaction) { // Asynchronous function to handle the event.
		if (!interaction.isChatInputCommand()) return; // Check if the interaction is a chat input command. If not, exit the function.
		// Retrieve the command from the client's command collection using the name of the command from the interaction.
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			// Catch and log any errors that occur during command execution.
			console.error(error);
			// Reply to the interaction with an error message. Use followUp if a reply or defer has already been sent.
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
