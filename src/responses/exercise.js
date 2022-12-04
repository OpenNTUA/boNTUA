const { ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { buildExerciseEmbed, buildExerciseMenuEmbed } = require('../builders/exercise.js');

async function respondWithExercise(exercise, interaction) {
	const embed = buildExerciseEmbed(exercise);
	await interaction.editReply({ embeds: [embed] });
}

async function respondWithExerciseMenu(exerciseList, interaction) {
	// Build the list of embeds for interaction
	const embedList = buildExerciseMenuEmbed(exerciseList);

	// Build the buttons
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setEmoji('⬅️')
				.setCustomId('left')
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setEmoji('➡️')
				.setCustomId('right')
				.setStyle(ButtonStyle.Primary),
		);

	// If there is only one embed, no need for buttons left and right arrow buttons
	if (embedList.length == 1) {
		await interaction.editReply({ embed: embedList[0] });
		return;
	}
	const message = await interaction.editReply({ embeds: [embedList[0]], components: [row], fetchReply: true });

	const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000, errors: ['time'] });


	let embedIndex = 0;
	collector.on('collect', async i => {
		await i.deferUpdate();
		const customId = i.customId;
		if (customId == 'left' && embedIndex > 0) {
			embedIndex--;
			await i.editReply({ embeds: [embedList[embedIndex]], components: [row] });
		}
		if (customId == 'right' && (embedIndex < embedList.length - 1)) {
			embedIndex++;
			await i.editReply({ embeds: [embedList[embedIndex]], components: [row] });
		}
	});

	collector.on('end', async () => {
		message.edit({ embeds: [embedList[embedIndex]], components: [] });
	});
}

module.exports = {
	respondWithExercise,
	respondWithExerciseMenu,
};