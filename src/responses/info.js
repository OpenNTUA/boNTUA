const { buildInfoEmbed } = require('../builders/info.js');

async function respondWithInfo(interaction) {
	await interaction.editReply({ embeds: [buildInfoEmbed()] });
}

module.exports = {
	respondWithInfo,
};