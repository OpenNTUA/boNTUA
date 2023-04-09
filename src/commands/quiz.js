const { SlashCommandBuilder } = require('discord.js');
const { respondWithQuestion, respondWithQuiz } = require('../responses/quiz.js');
const lodash = require('lodash');
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
		await interaction.deferReply();

		const subject = interaction.options.getString('subject');
		const id = interaction.options.getInteger('id');

		// Check if id is given
		if (id) {
			const question = data[subject]['quizes'].get(id.toString());
			// Check if question with that id exists
			if (!question) {
				await interaction.editReply('Δεν υπάρχει ερώτηση με αυτό το ID');
				return;
			}
			await respondWithQuestion(question, interaction);
		}
		// When no id is given
		else {
			// Get a random subset of the questions of size 10
			// If the size is bigger than the size of the array, it will return the whole array
			const questions = lodash.sampleSize(Array.from(data[subject]['quizes'].values()), 10);
			await respondWithQuiz(questions, interaction);
		}
	},
};