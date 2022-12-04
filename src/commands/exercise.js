const { SlashCommandBuilder } = require('discord.js');
const { respondWithExercise, respondWithExerciseMenu } = require('../responses/exercise.js');

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
		await interaction.deferReply();

		const subject = interaction.options.getString('subject');
		const exerciseName = interaction.options.getString('problem');

		if (exerciseName) {
			const exercise = data[subject]['exercises'].get(exerciseName);
			await respondWithExercise(exercise, interaction);
		}
		else {
			const exerciseList = Array.from(data[subject]['exercises'].values());
			await respondWithExerciseMenu(exerciseList, interaction);
		}
	},
};