import { db } from "../connection.js";

const collections = await db.listCollections(
    { name: "logs" },
    { nameOnly: true }
).toArray();

if (collections.length === 0) {
    await db.createCollection('logs', {
        capped: true,
        size: 1024 * 1024,
    })
}

const logsModel = db.collection('logs')

export default logsModel