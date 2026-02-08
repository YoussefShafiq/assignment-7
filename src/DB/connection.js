import { MongoClient } from 'mongodb'
import { DB_NAME, DB_URL } from '../../configs/app.config.js';

const client = new MongoClient(DB_URL);

export const db = client.db(DB_NAME)

export async function testDbConnection() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}