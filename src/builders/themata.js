const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, blockQuote } = require('discord.js');

const themata = {
	progintro: {
		'2017_kan_a_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2017_kan_a_3020.pdf',
		'2018_kan_b_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2018_kan_b_3020.pdf',
		'2019_ep_a_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2019_ep_a_3020.pdf',
		'2020_ep_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2020_ep_3020.pdf',
		'2020_kan_a_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2020_kan_a_3020.pdf',
		'2021_kan_(ΠΑΠ-Ω)_3020': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3020_progintro/2021_kan_(ΠΑΠ-Ω)_3020.pdf',
	},
	progtech: {
		'2017_ep_a_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2017_ep_a_3138.pdf',
		'2020_ep_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2020_ep_3138.pdf',
		'2021_ep_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2021_ep_3138.pdf',
		'2021_kan_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2021_kan_3138.pdf',
		'2021_ptix_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2021_ptix_3138.pdf',
		'2022_ep_3138': 'https://raw.githubusercontent.com/OpenNTUA/themata/main/3138_progtech/2022_ep_3138.pdf',
	},
};

function buildThemataMessage(subject) {
	const embed = new EmbedBuilder()
		.setThumbnail('https://avatars.githubusercontent.com/u/118369192?s=400&u=fe102fd9cd44dbeeea8177762ae6b27e1d5f9315&v=4')
		.setColor('#ffffff')
		.setFooter('Από ❤️ για το ΕΜΠ');

	if (subject === undefined) {
		embed
			.setTitle('ΘΕΜΑΤΑ')
			.setURL('https://drive.proton.me/urls/AS25NTFYBC#k3tt3RfsRHsm')
			.setDescription(
				`Για να δείτε όλους τους φακέλους και όλα τα αρχεία, πατήστε τον τίτλο "ΘΕΜΑΤΑ" επάνω ή το γκρι κουμπί παρακάτω.
				Ο φάκελος περιέχει θέματα για **progtech** και **progintro** και οι ονομασίες των αρχείων είναι στη μορφή:
				${blockQuote('year_kan/ep/ptix_group_subjectCode.pdf')}
				${blockQuote('έτος_kan/ep/ptix_ομάδα_κώδικας.pdf')}

				Τα αρχεία αυτά βρίσκονται και στο [GitHub](https://github.com/OpenNTUA/themata)`
				,
			);

		const progintroButton = new ButtonBuilder()
			.setCustomId('progintro')
			.setStyle(ButtonStyle.PRIMARY)
			.setLabel('progintro');
		const progtechButton = new ButtonBuilder()
			.setCustomId('progtech')
			.setStyle(ButtonStyle.PRIMARY)
			.setLabel('progtech');
		const themataButton = new ButtonBuilder()
			.setURL('https://drive.proton.me/urls/AS25NTFYBC#k3tt3RfsRHsm')
			.setStyle(ButtonStyle.LINK)
			.setLabel('ΘΕΜΑΤΑ');

		const row = new ActionRowBuilder()
			.addComponents(progintroButton, progtechButton, themataButton);

		return { embeds: [embed], components: [row], ephemeral: true, fetchReply: true };
	}
	else {
		embed
			.setTitle(`Θέματα του ${subject}`)
			.setDescription(
				`**Μπορείτε να κατεβάσετε το αρχείο πατώντας πάνω τους**
				${Object.entries(themata[subject]).reduce((acc, [key, value]) => {acc += `[${key}](${value})\n\n`; return acc;}, '')}`,
			);

		return { embeds: [embed], ephemeral: true };
	}
}

module.exports = {
	buildThemataMessage,
};