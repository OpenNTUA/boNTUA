const fs = require('node:fs');
const path = require('node:path');

const { REST, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID } = require('../config.js');

const commands = [];

// Grab all the command files from the commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(i => i.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, `${file}`);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log(`Started refreshings ${commands.length} application (/) commands`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands`);
	}
	catch (e) {
		console.error(e);
	}
})();