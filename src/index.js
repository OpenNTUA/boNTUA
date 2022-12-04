// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const { TOKEN } = require('../config.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(i => i.endsWith('.js'));

// Loading commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, `${file}`);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);
	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	console.log(interaction);
});

// Log in to Discord with your client's token
client.login(TOKEN);