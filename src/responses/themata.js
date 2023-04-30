const { ComponentType } = require('discord-buttons');
const { buildThemataMessage } = require('../builders/themata.js');

async function respondWithThemata(interaction) {
	const subject = interaction.options.getString('subject');
	const message = await interaction.editReply(buildThemataMessage(subject));

	if (subject === undefined) {
		const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 30000, errors: ['time'] });
		collector.on('collect', async i => {
			await i.deferUpdate();
			if (i.customId == 'progintro') {
				await i.Reply(buildThemataMessage('progintro'));
			}
			else if (i.customId == 'progtech') {
				await i.editReply(buildThemataMessage('progtech'));
			}
			collector.stop();
		});
	}
}

module.exports = {
	respondWithThemata,
};