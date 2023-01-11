import { Client, GatewayIntentBits, Events } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const API_TOKEN = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, event => {
	console.log(`Client ready... Logged in as ${event.user.tag}`);
});
client.login(API_TOKEN);