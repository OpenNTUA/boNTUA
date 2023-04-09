const { ActionRowBuilder, ButtonBuilder, ComponentType, ButtonStyle } = require('discord.js');
const { checkQuestion, correctlyAnsweredQuestion, buildQuestion, buildQuiz, buildResults } = require('../builders/quiz.js');

async function respondWithQuestion(question, interaction) {
	let { embed, row } = buildQuestion(question);

	// Send the embed and the component
	const message = await interaction.editReply({ embeds: [embed], components: [row], fetchReply: true });
	const filter = i => {
		// This part makes sure the button in Discord does not give error message "This interaction failed"
		i.deferUpdate();
		// Make it work for everyone no matter who called
		return true;
		// return i.user.id === interaction.user.id; // This makes it so only the person who called the command can answer
	};

	// Instead of using collector, you can use a promise based approach, kind of don't understand it but seems to work good for one interaction only
	message.awaitMessageComponent({ filter, componentType: ComponentType.Button, time: 60000 }).then(i => {
		const answer = i.customId;

		({ embed, row } = checkQuestion(question, embed, row, answer));
		// const checkedQuestion = checkQuestion(question, embed, row, answer);
		// embed = checkedQuestion.embed;
		// row = checkedQuestion.row;

		// If you have a message instance you can't use editReply, if you have CommandInteraction instance you cannot use edit()
		interaction.editReply({ embeds: [embed], components: [row] });
	}).catch(() => {
		// If the user does not answer in time, it will show the correct answer
		({ embed, row } = correctlyAnsweredQuestion(question, embed, row));
		interaction.editReply({ embeds: [embed], components: [row] });
	});
}

async function respondWithQuiz(questions, interaction) {
	// This is the length of the quiz
	const quizLength = questions.length;

	const { embedList, componentList } = buildQuiz(questions);

	// It does not need filter because I will make it ephemeral
	const endingTime = Date.now() + quizLength * 120000;
	const startTime = Date.now();
	embedList[0].setFooter({ text: `📜Ερώτηση ${1} από ${quizLength} | ⌛Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)} λεπτά` });
	const message = await interaction.editReply({ embeds: [embedList[0]], components: [componentList[0]], ephemeral: true, fetchReply: true });


	const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: quizLength * 120000, errors: ['time'] });

	let quizIndex = 0;
	let rightAnswerCount = 0;
	collector.on('collect', async i => {
		// You defer the update because it might take more than 3 seconds to update and Discord will not allow it
		await i.deferUpdate();
		// customId has the format of `ij` where i is the index of the question and j is the index of the answer
		if (i.customId[i.customId.length - 1] == questions[quizIndex].correctAnswerIndex.toString()) {
			rightAnswerCount++;
		}
		// If it is the last question's interaction(i), stop the collector
		if (quizIndex == questions.length - 1) {
			collector.stop();
			return;
		}
		quizIndex++;
		embedList[quizIndex].setFooter({ text: `📜Ερώτηση ${quizIndex + 1} από ${quizLength} | ⌛Χρόνος: ${Math.floor((endingTime - Date.now()) / 60000)} λεπτά` });
		// Replies with the next question
		await i.editReply({ embeds: [embedList[quizIndex]], components: [componentList[quizIndex]], ephemeral: true });
	});

	// The reason is user with collecter.stop() used, otherwise it is time
	collector.on('end', async (collected, reason) => {
		const collectedList = Array.from(collected.values());
		const answers = collectedList.map(i => i.customId[i.customId.length - 1]);
		if (answers.length == 0) {
			return;
		}

		const resultEmbed = buildResults(questions, embedList, componentList, startTime, rightAnswerCount, answers, reason);

		// Make the menu button component
		const menuRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('menu')
					.setStyle(ButtonStyle.Primary)
					.setLabel('Λεπτομέριες'),
			);

		// We do this using the ButtonInteraction because the original ApplicationCommandInteraction can only be used for 15 minutes
		// Just like the deferred ButtonInteractions but since these interactions were received later, they can be used when ApplicationCommandInteraction can't
		let msg;
		try {
			msg = await collectedList[collectedList.length - 1].editReply({ embeds: [resultEmbed], components: [menuRow], ephemeral: true, fetchReply: true });
		}
		catch (e) {
			console.log(e);
			return;
		}
		const newCollector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 10 * 60000, errors: ['time'] });

		let index = 0;
		newCollector.on('collect', async i => {
			await i.deferUpdate();
			if (i.customId == 'menu') {
				menuRow.setComponents(
					new ButtonBuilder()
						.setCustomId('left')
						.setStyle(ButtonStyle.Primary)
						.setEmoji('⬅️'),
					new ButtonBuilder()
						.setCustomId('results')
						.setStyle(ButtonStyle.Primary)
						.setLabel('Αποτελέσματα'),
					new ButtonBuilder()
						.setCustomId('right')
						.setStyle(ButtonStyle.Primary)
						.setEmoji('➡️'),
				);
				await i.editReply({ embeds: [embedList[index]], components: [componentList[index], menuRow], ephemeral: true });
			}
			else if (i.customId == 'left') {
				if (!index == 0) {
					index--;
					await i.editReply({ embeds: [embedList[index]], components: [componentList[index], menuRow], ephemeral: true });
				}
			}
			else if (i.customId == 'right') {
				if (index < embedList.length - 1) {
					index++;
					await i.editReply({ embeds: [embedList[index]], components: [componentList[index], menuRow], ephemeral: true });
				}
			}
			else if (i.customId == 'results') {
				menuRow.setComponents(
					new ButtonBuilder()
						.setCustomId('menu')
						.setLabel('Λεπτομέριες')
						.setStyle(ButtonStyle.Primary),
				);
				await i.editReply({ embeds: [resultEmbed], components: [menuRow], ephemeral: true });
			}
		});
		// c is collected and a is an array of all the collected interactions
		collector.on('end', async c => {
			const a = Array.from(c.values());
			await a[a.length - 1].editReply({ embeds: [resultEmbed], components: [], ephemeral: true });
		});
	});

}

module.exports = {
	respondWithQuestion,
	respondWithQuiz,
};
