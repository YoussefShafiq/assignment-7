import bookModel from "../../DB/Models/book.model.js";
import logsModel from "../../DB/Models/logs.model.js";
import { ObjectId } from 'mongodb'


export async function addLog(log) {
    const { book_id, action } = log

    if (!book_id || !action) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }

    const bookObjectId = new ObjectId(book_id)

    const bookIdExists = await bookModel.findOne({ _id: bookObjectId })
    if (!bookIdExists) {
        throw new Error('book id does not exist', { cause: { statusCode: 404 } })
    }

    const result = await logsModel.insertOne({
        book_id: bookObjectId,
        action
    })

    return result

}


export async function getLogs() {
    const result = await logsModel.find().toArray()
    return result
}


export async function aggregate4() {
    const result = await logsModel.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: 'book_id',
                foreignField: '_id',
                as: 'book'
            }
        }
    ]).toArray()

    return result
}