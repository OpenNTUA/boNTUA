const { SlashCommandBuilder } = require('discord.js');
const data = require('../data/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quiz')
		.setDescription('Random 10 multiple choice question quiz')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('The subject to get the quiz for')
				.setRequired(true)
				.addChoices(...Object.keys(data).map(choice => ({ name: choice, value: choice }))),
		)
		.addIntegerOption(option =>
			option
				.setName('id')
				.setDescription('The ID of the multiple choice question you want')
				.setMinValue(1),
		),
	execute: async (interaction) => {
		await interaction.reply('poing');
	},
};