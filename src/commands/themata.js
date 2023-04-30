const { SlashCommandBuilder } = require('discord.js');
const { respondWithThemata } = require('../responses/themata.js');
// const data = require('../data/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('themata')
		.setDescription('Τα θέματα των εξετάσεων παλιών ετών')
		.addStringOption(option =>
			option
				.setName('subject')
				.setDescription('Το μάθημα που θέλεις να δεις τα θέματα του')
				.addChoices({ name: 'progintro', value: 'progtintro' }, { name: 'progtech', value: 'progtech' }),
		),
	execute: async (interaction) => {
		await interaction.deferReply();
		await respondWithThemata(interaction);
	},
};