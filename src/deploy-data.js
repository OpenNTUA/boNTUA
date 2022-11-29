const fs = require('node:fs');
const path = require('node:path');

module.exports = () => {
	const dataDirectory = path.join(__dirname, './data');
	const subjects = fs.readdirSync(dataDirectory);

	const output = {
		'progintro_exercises': [],
		'progintro_quizes': [],
		'progtech_exercises': [],
		'progtech_quizes': [],
	};


	for (const subject of subjects) {
		const subjectDirectory = path.join(dataDirectory, `./${subject}`);
		const sections = fs.readdirSync(subjectDirectory);
		for (const section of sections) {
			const sectionPath = path.join(subjectDirectory, `./${section}`);
			const sectionData = require(sectionPath);
			if (sectionData === undefined) continue;

			const sectionDataArray = Array.from(sectionData.entries());
			for (const [key, value] of sectionDataArray) {
				output[[subject, section.split('.')[0]].join('_')].push({ id: key, ...value });
			}
		}
	}

	return output;
};
