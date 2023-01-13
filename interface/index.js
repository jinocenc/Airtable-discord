import dotenv from "dotenv";
// import { syncZendeskUsers } from './query.js';
dotenv.config();

// await syncZendeskUsers()
import { fetchUserMention } from "../discord/utils";
import express from "express";
import { client } from "./discord/client.js";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
	console.log("visitor");
	res.send();
});
app.post("/createFeedbackPost", async (req, res) => {
	console.log("request recieved");
	const feedbackChannelID = "1057852137750663259";
	let addTags = [];
	let feedbackForumChannel = undefined;
	try {
		feedbackForumChannel = await client.channels.cache.get(feedbackChannelID);
	} catch (err) {
		console.error("no channel found");
		res.status(500).json({ error: "channel not found" });
		return;
	}
	if (!feedbackForumChannel) throw "no channel found";
	const { mentions, message, source } = req.body;
	const tagCollection = feedbackForumChannel.availableTags;
	let tags = [];
	tags = message.tags.map((tag) => {
		const tagIDs = tagCollection.filter((t) => t.name == tag);
		if (tagIDs.length) {
			return tagIDs[0];
		} else {
			addTags.push({ name: tag });
			return;
		}
	});
	const availableTags = tagCollection.concat(addTags);
	await feedbackForumChannel.setAvailableTags(availableTags);
	if (!tags.length) tags = await feedbackForumChannel.availableTags;
	addTags = [];
	let audience = await Promise.all(
		mentions.map(async (handle) => fetchUserMention(handle)),
	);
	audience = audience.join(" ");
	const applied_tags = tags.map((tag) => tag.id);
	console.log(applied_tags);
	console.log(await audience);
	const payload = {
		name: message.title,
		message: {
			content: message.content + "\n" + audience,
		},
		appliedTags: applied_tags,
	};
	await feedbackForumChannel.threads.create(payload);
	console.log("airtable id: ", source);
	res.status(200).json({ message: "post created" });
	console.log("post created");
});

app.listen(3000, () => console.log("Server started on port 3000"));

