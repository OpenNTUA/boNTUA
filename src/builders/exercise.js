const { EmbedBuilder, codeBlock } = require('discord.js');

function buildExerciseEmbed(exercise) {
	const thumbnailLink = 'https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
	const embed = new EmbedBuilder()
		.setTitle(exercise.title)
		.setDescription(`**Εκφώνηση**\n${exercise.description}`)
		.setThumbnail(thumbnailLink);


	const fields = [];
	if (exercise.inputDescription) {
		fields.push({ name: 'Δεδομένα εισόδου', value: exercise.inputDescription });
	}
	if (exercise.outputDescription) {
		fields.push({ name: 'Δεδομένα εξόδου', value: exercise.outputDescription });
	}
	if (exercise.constraints) {
		fields.push({ name: 'Περιορισμοί', value: `\`\`\`\n${exercise.constraints}\n\`\`\`` });
	}
	if (exercise.input) {
		if (Array.isArray(exercise.input)) {
			for (let i = 0; i < exercise.input.length; i++) {
				fields.push({ name: `Είσοδος ${i + 1}`, value: codeBlock(exercise.input[i]), inline: true });
				fields.push({ name: `Εξόδος ${i + 1}`, value: codeBlock(exercise.output[i]), inline: true });
				if (!(i == exercise.input.length - 1)) {
					fields.push({ name: '\u200B', value: '\u200B' });
				}
			}
		}
		else {
			fields.push({ name: 'Είσοδος', value: codeBlock(exercise.input), inline: true });
			fields.push({ name: 'Εξόδος', value: codeBlock(exercise.output), inline: true });
		}
	}

	embed.addFields(fields);
	if (exercise.url) {
		embed.setURL(exercise.url);
	}

	if (exercise.difficulty && exercise.difficultyGrade) {
		embed.setAuthor({ name: `${exercise.difficulty} ${exercise.difficultyGrade}` });
	}
	else if (exercise.difficulty) {
		embed.setAuthor({ name: exercise.difficulty });
	}

	return embed;
}

function buildExerciseMenuEmbed(exerciseList) {
	const length = exerciseList.length;
	const parts = Math.ceil(length / 30);

	const embedList = [];

	for (let i = 1; i <= parts; i++) {
		const embed = new EmbedBuilder()
			.setTitle('Λίστα Επιλογών')
			.setThumbnail('https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png');

		const partList = exerciseList.slice((i - 1) * 30, (i - 1) * 30 + 30);
		let partString = '';
		for (let j = 1; j <= 15; j++) {
			if (j > partList.length) {
				break;
			}

			partString += `${partList[j - 1].difficulty[0]}${partList[j - 1].difficultyGrade}- ${partList[j - 1].title}` + ' '.repeat(14 - partList[j - 1].title.length);
			if (partList[j - 1 + 15]) {
				partString += `${partList[j - 1 + 15].difficulty[0]}${partList[j - 1 + 15].difficultyGrade}- ${partList[j - 1 + 15].title}` + ' '.repeat(14 - partList[j - 1 + 15].title.length);
			}
			else {
				partString += ' '.repeat(19);
			}

			if (j != 15) {
				partString += '\n';
			}
		}
		embed.setDescription(codeBlock(partString));
		embed.setFooter({ text: `⬅️ Σελίδα ${i} από ${Math.ceil(parts)} ➡️  Δύσκολο/Εύκολο[0-3]` });
		embedList.push(embed);
	}

	return embedList;
}

module.exports = {
	buildExerciseEmbed,
	buildExerciseMenuEmbed,
};