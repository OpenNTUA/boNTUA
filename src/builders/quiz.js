const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Some things here work because of JavaScript's type coercion feature
// For example if you do 1 == '1' it will return true, whereas 1 === '1' will return false
// This is because == checks for value equality, whereas === checks for value and type equality

const numberToWord = new Map();
numberToWord.set(1, '🇦');
numberToWord.set(2, '🇧');
numberToWord.set(3, '🇨');
numberToWord.set(4, '🇩');
numberToWord.set(5, '🇪');

function buildQuestion(question) {
	// embed part
	const embed = new EmbedBuilder()
		.setTitle(`Ερώτηση από ${question.year}`)
		.setDescription(question.question)
		.setAuthor({ name: `ID: ${question.questionId}` });
	if (question.code) {
		if (question.code.length == 1) {
			embed.addFields({ name: 'Κώδικας', value: question.code[0] });
		}
		else {
			for (let j = 0; j < question.code.length; j++) {
				embed.addFields({ name: `Κώδικας ${j + 1}`, value: question.code[j], inline: true });
			}
		}
	}
	if (question.imageURL) {
		embed.setImage(question.imageURL);
	}
	let answerString = '';
	for (let j = 0; j < question.answers.length; j++) {
		answerString += `${numberToWord.get(j + 1)} ${question.answers[j]}\n`;
	}
	embed.addFields({ name: 'Επιλογές', value: answerString });

	// component part
	const row = new ActionRowBuilder();
	const buttonList = [];
	for (let j = 0; j < question.answers.length; j++) {
		const button = new ButtonBuilder()
			.setCustomId(`${j}`)
			.setEmoji(numberToWord.get(j + 1))
			.setStyle(ButtonStyle.Secondary);
		buttonList.push(button);
	}
	row.addComponents(...buttonList);

	console.log(embed.fields);
	return {
		embed,
		row,
	};
}

function checkQuestion(question, embed, row, answer) {
	const correct = question.correctAnswerIndex;

	let answerString = '';
	for (let j = 0; j < question.answers.length; j++) {
		answerString += `${numberToWord.get(j + 1)} ${question.answers[j]}`;
		if (j == correct) {
			answerString += ' ✅';
		}
		else if (j == answer) {
			answerString += ' ❌';
		}
		answerString += '\n';
	}

	for (const embedField of embed.data.fields) {
		if (embedField.name == 'Επιλογές') {
			embedField.value = answerString;
		}
	}

	for (const button of row.components) {
		// This works because of Javascript's type coercion "1" == 1 is true, but if you don't like that, use === instead
		if (button.data.custom_id == correct) {
			button.setStyle(ButtonStyle.Success);
		}
		else if (button.data.custom_id == answer) {
			button.setStyle(ButtonStyle.Danger);
		}
		button.setDisabled(true);
	}

	return {
		embed,
		row,
	};
}

function correctlyAnsweredQuestion(question, embed, row) {
	let answerString = '';
	for (let j = 0; j < question.answers.length; j++) {
		answerString += `${numberToWord.get(j + 1)} ${question.answers[j]}`;
		if (j == question.correctAnswerIndex) {
			answerString += ' ✅';
		}
		answerString += '\n';
	}

	for (const embedField of embed.data.fields) {
		if (embedField.name == 'Επιλογές') {
			embedField.value = answerString;
		}
	}

	for (const button of row.components) {
		if (button.data.custom_id == question.correctAnswerIndex.toString()) {
			button.setStyle(ButtonStyle.Success);
		}
		button.setDisabled(true);
	}

	return {
		embed,
		row,
	};
}

function buildQuiz(questions) {
	// The lists that will hold the embeds and components
	const embedList = [];
	const componentList = [];


	// Build the list of embeds and components for interaction
	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];

		// embed part
		const embed = new EmbedBuilder()
			.setTitle(`Ερώτηση από ${question.year}`)
			.setDescription(question.question)
			.setAuthor({ name: `ID: ${question.questionId}` });
		if (question.code) {
			if (question.code.length == 1) {
				embed.addFields({ name: 'Κώδικας', value: question.code[0] });
			}
			else {
				for (let j = 0; j < question.code.length; j++) {
					embed.addFields({ name: `Κώδικας ${j + 1}`, value: question.code[j], inline: true });
				}
			}
		}
		if (question.imageURL) {
			embed.setImage(question.imageURL);
		}
		let answerString = '';
		for (let j = 0; j < question.answers.length; j++) {
			answerString += `${numberToWord.get(j + 1)} ${question.answers[j]}\n`;
		}
		embed.addFields({ name: 'Επιλογές', value: answerString });
		embedList.push(embed);

		// component part
		const row = new ActionRowBuilder();
		const buttonList = [];
		for (let j = 0; j < question.answers.length; j++) {
			const button = new ButtonBuilder()
				// j is the index of the answer, and i is the index of the question
				.setCustomId(`${i}${j}`)
				.setEmoji(numberToWord.get(j + 1))
				.setStyle(ButtonStyle.Secondary);
			buttonList.push(button);
		}
		row.addComponents(...buttonList);
		componentList.push(row);
	}

	return {
		embedList,
		componentList,
	};
}

function buildResults(questions, embedList, componentList, startTime, rightAnswerCount, answers, reason) {
	const resultList = [];
	for (let i = 0; i < questions.length; i++) {
		// collected is a Map object so to get the ButtonInteraction objects that were collected we need to use Array.from(collected.values())
		const data = questions[i];
		const correctAnswer = data.correctAnswerIndex;
		let givenAnswer = undefined;
		// collectedList might be lesser size and that will happen when we get a time error
		if (i < answers.length) {
			givenAnswer = answers[i];
		}
		// Each row can take up to 5 buttons and you can have up to 5 rows.
		const row = componentList[i];
		const embed = embedList[i];

		if (givenAnswer == correctAnswer) {
			resultList.push(`${i + 1}` + ' '.repeat(2 - `${i + 1}`.length) + ': ' + `ID-${data.questionId}` + ' '.repeat(6 - `ID-${data.questionId}`.length) + '✅');
		}
		else if (givenAnswer == undefined) {
			resultList.push(`${i + 1}` + ' '.repeat(2 - `${i + 1}`.length) + ': ' + `ID-${data.questionId}` + ' '.repeat(6 - `ID-${data.questionId}`.length) + 'NA');
		}
		else {
			resultList.push(`${i + 1}` + ' '.repeat(2 - `${i + 1}`.length) + ': ' + `ID-${data.questionId}` + ' '.repeat(6 - `ID-${data.questionId}`.length) + '❌');
		}

		for (const button of row.components) {
			const button_id = button.data.custom_id[button.data.custom_id.length - 1];
			if (button_id == correctAnswer) {
				button.setStyle(ButtonStyle.Success);
			}
			else if (button_id == givenAnswer) {
				button.setStyle(ButtonStyle.Danger);
			}
			button.setDisabled(true);
		}

		let answerString = '';
		for (let j = 0; j < data.answers.length; j++) {
			answerString += `${numberToWord.get(j + 1)} ${data.answers[j]}`;
			if (j == correctAnswer) {
				answerString += ' ✅';
				if (givenAnswer == undefined) {
					answerString += ' NA';
				}
			}
			else if (j == givenAnswer) {
				answerString += ' ❌';
			}
			answerString += '\n';
		}
		for (const embedField of embed.data.fields) {
			if (embedField.name == 'Επιλογές') {
				embedField.value = answerString;
			}
		}
		embed.setFooter({ text: `📜Ερώτηση ${i + 1} από ${questions.length}` });
	}

	const embed = new EmbedBuilder();
	if (reason == 'time') {
		embed.setTitle('Αποτελέσματα - Τέλος Χρόνου');
	}
	else if (reason == 'user') {
		embed.setTitle('Αποτελέσματα');
	}

	// Now we have to make the resultList show nicely side by side
	let resultString = '';
	const halfLength = Math.ceil(resultList.length / 2);
	for (let i = 0; i < halfLength; i++) {
		resultString += resultList[i] + '\t|\t';
		if (resultList[i + halfLength]) {
			resultString += resultList[i + halfLength];
		}
		resultString += '\n';
	}

	embed.setDescription(`📜 Απάντησες σωστά σε **${rightAnswerCount} από ${questions.length}** ερωτήσεις\n⌛ Μέσα σε χρόνο: **${Math.ceil((Date.now() - startTime) / 60000)} λεπτά**\n⚖️ Συνολικό ποσοστό: **${Math.floor(rightAnswerCount / questions.length * 100)}%**` + '\n\n' + '```\n' + resultString + '\n```');

	return embed;
}

module.exports = {
	buildQuestion,
	checkQuestion,
	correctlyAnsweredQuestion,
	buildQuiz,
	buildResults,
};