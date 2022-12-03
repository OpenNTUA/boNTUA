const progintro_exercises = require('./progintro/exercises.js');
const progintro_quizes = require('./progintro/quizes.js');
const progtech_exercises = require('./progtech/exercises.js');
const progtech_quizes = require('./progtech/quizes.js');

module.exports = {
	progintro: {
		exercises: progintro_exercises,
		quizes: progintro_quizes,
	},
	progtech: {
		exercises: progtech_exercises,
		quizes: progtech_quizes,
	},
};

