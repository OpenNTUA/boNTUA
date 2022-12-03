const { SlashCommandBuilder } = require('discord.js');
// const data = require('../data/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('themata')
		.setDescription('Get the link to a pdf file of past exam papers')
		.addNumberOption(option =>
			option
				.setName('year')
				.setDescription('The year of the test')
				.setAutocomplete(true),
		)
		.addStringOption(option =>
			option
				.setName('type')
				.setDescription('The type of exam: Eπαναληπτική ή Κανονική')
				.addChoices('Κανονική', 'Eπαναληπτική'),
		),
	execute: async (interaction) => {
		await interaction.reply('Pong');
	},
};