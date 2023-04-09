const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute: async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		console.log('---------');
		console.log(interaction.user.username, 'triggered an interaction');
		console.log('---------');
	},
};