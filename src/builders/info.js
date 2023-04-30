const { EmbedBuilder } = require('discord.js');

function buildInfoEmbed() {
	const embed = new EmbedBuilder()
		.setTitle('Γενικές πληροφορίες')
		.setColor('#ffffff')
		.setFooter({ text: 'Με ❤️ για το ΕΜΠ' })
		.setDescription(
			'**[Forum Σχολής(ΣΗΜΜΥ)](https://shmmy.ntua.gr/forum/) :** Εδώ μπορείται να βρείτε σημειώσεις και παλιά θέματα όλων των μαθημάτων του ΕΜΠ.\n\n**[GitHub Students](https://education.github.com/pack) :** Επειδή είστε φοιτητές, έχετε πολλά προνόμοια και δωρεάν services(JetBrains CLion IDE), θα δείτε την λίστα των δωρεάν πραγμάτων που σας προσφέρει το GitHub.\n\n**[ΔΗΛΟΣ 365](https://delos365.grnet.gr/) :** Δωρεάν Microsoft Office 365 για καθηγητές και φοιτητές.\n\n**[repl.it](https://replit.com/) :** Για όσους δεν θέλουν να κατεβάσουν IDE, μπορείτε να τρέχετε τον κώδικά σας και να κάνετε debugging στο browser.\n\n**[Webmail NTUA](https://webmail.ntua.gr/) :** Μπορείτε να συνδεθείτε στο ιδρυματικό σας email, πχ. __el23999@mail.ntua.gr__.\n\n**[CamScanner](https://www.camscanner.com/) :** Έχετε δωρεάν subscription το οποίο αφαιρεί όλες τις διαφημίσεις. Είναι το καλύτερο Scanner αλλά είναι κινέζικο για αυτό μην ανεβάσετε/σκανάρετε sensitive αρχεία όπως ταυτότητα\n\n**Τα mail των καθηγητών __progintro__:**\n- Στάθης Ζάχος: __zachos@cs.ntua.gr__\n- Γεώργιος Γκούμας: __goumas@cslab.ece.ntua.gr__\n- Δημήτρης Τσουμάκος: __dtsouma@cslab.ece.ntua.gr__\n- Δημήτρης Φωτάκης: __fotakis@cs.ntua.gr__\n- Μάριος Κόνιαρης: __mkoniari@central.ntua.gr__\n- Πέτρος Ποτίκας: __ppotik@cs.ntua.gr__\n- Δώρα Σούλιου: __dsouliou@mail.ntua.gr__\n\n**Επικοινωνία για θέματα __progtech__:**\n- __progtech@cslab.ece.ntua.gr__\n\n',
		);


	return embed;
}

module.exports = {
	buildInfoEmbed,
};