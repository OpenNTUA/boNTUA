const { SlashCommandBuilder } = require('discord.js');
const { respondWithInfo } = require('../responses/info.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Gives general information or information about the chosen subject'),
	execute: async (interaction) => {
		await interaction.deferReply();
		await respondWithInfo(interaction);
	},
};