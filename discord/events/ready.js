import { Events } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	execute: (event) => {
		console.log(`Client ready... Logged in as ${event.user.tag}`);
	},
};