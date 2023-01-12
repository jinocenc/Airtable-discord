import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export default async function addEventListeners(client) {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.join(path.dirname(__filename), '..');
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		try {
			const emodule = await import(filePath);
			const event = emodule.default;
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			}
			else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
		catch (err) {
			console.error('file not found', err);
		}

	}
}