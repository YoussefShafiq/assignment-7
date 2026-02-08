import bookModel from "../../DB/Models/book.model.js";
import { ObjectId } from 'mongodb'

export async function addBook(book) {
    const { title, author, year, genres } = book

    if (!title || !author || !year || !genres) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }

    if (typeof title !== 'string' || typeof author !== 'string' || typeof Number(year) !== 'number' || !Array.isArray(genres)) {
        throw new Error('invalid data types', { cause: { statusCode: 400 } })
    }

    const result = await bookModel.insertOne({ title, author, year, genres })
    return result
}

export async function addBooks(books) {
    books.forEach(book => {
        const { title, author, year, genres } = book
        if (!title || !author || !year || !genres) {
            throw new Error('missing required fields', { cause: { statusCode: 400 } })
        }
        if (typeof title !== 'string' || typeof author !== 'string' || typeof Number(year) !== 'number' || !Array.isArray(genres)) {
            throw new Error('invalid data types', { cause: { statusCode: 400 } })
        }
    })

    const result = await bookModel.insertMany(books)
    return result
}

export async function getBooks() {
    const result = await bookModel.find().toArray()
    return result
}

export async function updateBookYear(newYear, title) {

    if (!newYear || !title) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }

    if (typeof title !== 'string' || typeof Number(newYear) !== 'number') {
        throw new Error('invalid data types', { cause: { statusCode: 400 } })
    }

    const result = await bookModel.updateOne({ title }, { $set: { year: newYear } })
    if (result.matchedCount === 0) {
        throw new Error('book title does not exist', { cause: { statusCode: 404 } })
    }
    return result
}

export async function getBookByTitle(title) {
    const result = await bookModel.findOne({ title })
    if (!result) {
        throw new Error('book title does not exist', { cause: { statusCode: 404 } })
    }
    return result
}

export async function getBooksByYearRange(fromYear, toYear) {
    const result = await bookModel.find({ year: { $gte: Number(fromYear), $lte: Number(toYear) } }).toArray()

    return result
}

export async function getBooksByGenre(genre) {
    const result = await bookModel.find({ genres: { $in: [genre] } }).toArray()
    return result
}

export async function getBooksSkipLimit(skip, limit) {
    const result = await bookModel.find().skip(Number(skip)).limit(Number(limit)).sort({ year: -1 }).toArray()
    return result
}

export async function getBooksIntegerYear() {
    const result = await bookModel.find({ year: { $type: 'int' } }).toArray()
    return result
}

export async function getBooksWithoutGenre(genre) {
    const result = await bookModel.find({ genres: { $nin: [genre] } }).toArray()
    return result
}

export async function deleteOldBooks(year) {
    if (!year) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }
    if (typeof Number(year) !== 'number') {
        throw new Error('invalid data types', { cause: { statusCode: 400 } })
    }
    const result = await bookModel.deleteMany({ year: { $lt: Number(year) } })
    if (result.deletedCount === 0) {
        throw new Error('no books found before the specified year', { cause: { statusCode: 404 } })
    }

    return result
}

export async function aggregate1(year) {
    if (!year) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }
    if (typeof Number(year) !== 'number') {
        throw new Error('invalid data types', { cause: { statusCode: 400 } })
    }
    const result = await bookModel.aggregate([
        {
            $match: { year: { $gt: Number(year) } }
        },
        {
            $sort: { year: -1 }
        }
    ]).toArray()

    return result
}

export async function aggregate2(year) {
    if (!year) {
        throw new Error('missing required fields', { cause: { statusCode: 400 } })
    }
    if (typeof Number(year) !== 'number') {
        throw new Error('invalid data types', { cause: { statusCode: 400 } })
    }
    const result = await bookModel.aggregate([
        {
            $match: { year: { $gt: Number(year) } }
        },
        {
            $project: {
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]).toArray()

    return result
}

export async function aggregate3() {
    const result = await bookModel.aggregate([
        {
            $unwind: '$genres'
        }
    ]).toArray()

    return result
}
