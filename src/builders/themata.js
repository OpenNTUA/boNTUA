const { EmbedBuilder } = require('discord.js');

function buildThemataEmbed(themata) {
	const thumbnailLink = 'https://e7.pngegg.com/pngimages/46/626/png-clipart-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template.png';
	const embed = new EmbedBuilder()
		.setTitle('ΘΕΜΑΤΑ')
		.setDescription(`**Εκφώνηση**\n${themata.description}`)
		.setThumbnail(thumbnailLink);

	return embed;
}

module.exports = {
	buildThemataEmbed,
};