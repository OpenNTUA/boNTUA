const { SlashCommandBuilder } = require('discord.js');

const data = require('../data/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exercise')
		.setDescription('Gives a list of problems in the chosen subject')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the problem for')
				.addChoices(...Object.keys(data).map(choice => ({ name: choice, value: choice })))
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('problem')
				.setDescription('The problem you want')
				.setAutocomplete(true)),
	execute: async (interaction) => {
		await interaction.reply('pong');
	},
};