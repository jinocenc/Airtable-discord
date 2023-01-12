import { Client, GatewayIntentBits } from 'discord.js';
import addEventListeners from './utils/eventController.js';

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const API_TOKEN = process.env.DISCORD_TOKEN;
addEventListeners(client).then(() => client.login(API_TOKEN));