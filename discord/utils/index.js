import { client } from "../client.js";

/**
 * Encodes mentions by name into callable strings after retrieving associated if of the User
 * @param {string} Discord handle to convert into mention
 *
 */
export async function fetchUserMention(handle) {
	const guild = await client.guilds.fetch("954888204660654101");
	const mention = await guild.members.fetch({ query: handle, limit: 1 });
	console.log(mention.first()?.user.id);
	if (mention) return `<@${mention.first()?.user.id}>`;
	return undefined;
}

