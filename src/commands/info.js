const { SlashCommandBuilder } = require('discord.js');
const data = require('../data/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Gives general information or information about the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject you want the information for')
				.setChoices(...Object.keys(data).map(choice => ({ name: choice, value: choice }))),
		),
	execute: async (interaction) => {
		await interaction.reply('pong');
	},
};