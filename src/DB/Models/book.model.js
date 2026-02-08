import { db } from "../connection.js";

const collections = await db.listCollections(
    { name: "books" },
    { nameOnly: true }
).toArray();

if (collections.length === 0) {
    await db.createCollection('books', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title'],
                properties: {
                    title: {
                        bsonType: 'string',
                        minLength: 1,
                        description: 'title is required and must be a string',
                    }
                }
            }
        },
        validationAction: 'error',
        validationLevel: 'strict',
    })
}

const bookModel = db.collection('books')

await bookModel.createIndex({ title: 1 }, { unique: true })

export default bookModel