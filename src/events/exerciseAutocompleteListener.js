const { Events } = require('discord.js');
const data = require('../data/index.js');

module.exports = {
	name: Events.InteractionCreate,
	execute: async (interaction) => {
		// If it is not an Autocomplete of exercise command, return
		if (!interaction.isAutocomplete() || interaction.commandName !== 'exercise') return;

		const subject = interaction.options.getString('subject');

		// Checking if subject was chosen, if not, respond with empty array which means no options
		if (subject) {
			//
			if (!data[subject]['exercises']) return;

			// Options are objects of the form { name: someName, value: someValue }
			const exerciseOptions = Array.from(
				data[subject]['exercises'].keys(),
				key => ({ name: key, value: key }),
			);

			// Get the currently written value (focused value) in the problem
			// focusedOption is a type of { name: 'problem', value: inputFromProblemField }
			// since there is only one Autocomplete event in the exercise, it can only be of 'problem'
			// which is why we don't check with (focusedOption.name === 'problem')
			const focusedOption = interaction.options.getFocused(true);
			let filtered = exerciseOptions.filter(({ value }) => value.startsWith(focusedOption.value));

			// Discord can only show up to 25 options, you try to give more than that and it gives an error
			if (filtered.length > 25) {
				filtered = filtered.slice(0, 25);
			}

			// Responding with the options
			await interaction.respond(filtered);

		}
		else {
			// Empty array means no options
			await interaction.respond([]);
		}
	},
};