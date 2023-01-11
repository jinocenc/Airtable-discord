// const MongoClient = require("mongodb").MongoClient
import { MongoClient } from 'mongodb';
// import { httpRequest } from "./requester"

export async function syncZendeskUsers() {
	const uri = process.env.DEV_MONGO_CONNECTION_STRING;
	const client = new MongoClient(uri, { useNewUrlParser: true });

	// const requestCounter = 0;

	try {
		await client.connect();
		const db = client.db('Primary');
		const USERS = db.collection('User');
		console.log(await USERS.find({ email: 'jerold.inocencio@gmail.com' }).toArray());
		// const User_Collection = db.collection("User")
		// // const cursor = User_Collection
		// const docs = User_Collection.find({"email": "jerold.inocencio@gmail.com"})
		// console.log(JSON.stringify(User_Collection))
		// // for(document in cursor){
		// //     console.log(document)
		// // }
	}
	catch (err) {
		console.log(err);
	}
	await client.close();
}