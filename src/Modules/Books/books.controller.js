import { Router } from "express";
import { addBook, addBooks, aggregate1, aggregate2, aggregate3, deleteOldBooks, getBookByTitle, getBooks, getBooksByGenre, getBooksByYearRange, getBooksIntegerYear, getBooksSkipLimit, getBooksWithoutGenre, updateBookYear } from "./books.service.js";
import successResponse from "../../utils/successResponse.js";


const booksRouter = Router()

booksRouter.post('/add', async (req, res) => {
    const result = await addBook(req.body)
    return successResponse(res, result, 'book added successfully', 201)
})

booksRouter.post('/add-bulk', async (req, res) => {
    const result = await addBooks(req.body)
    return successResponse(res, result, 'books added successfully', 201)
})

booksRouter.get('/', async (req, res) => {
    const result = await getBooks()
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.patch('/update-year/:title', async (req, res) => {
    const result = await updateBookYear(req.body.year, req.params.title)
    return successResponse(res, result, 'book updated successfully')
})

booksRouter.get('/title/:title', async (req, res) => {
    const result = await getBookByTitle(req.params.title)
    return successResponse(res, result, 'book retrieved successfully')
})

booksRouter.get('/year-range', async (req, res) => {
    const result = await getBooksByYearRange(req.query.from, req.query.to)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/genre', async (req, res) => {
    const result = await getBooksByGenre(req.query.genre)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/skip-limit', async (req, res) => {
    const result = await getBooksSkipLimit(req.query.skip, req.query.limit)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/integer-year', async (req, res) => {
    const result = await getBooksIntegerYear()
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/exclude-genre', async (req, res) => {
    const result = await getBooksWithoutGenre(req.query.genre)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.delete('/before-year', async (req, res) => {
    const result = await deleteOldBooks(req.query.year)

    return successResponse(res, result, 'books deleted successfully')
})

booksRouter.get('/aggregate1', async (req, res) => {
    const result = await aggregate1(req.query.year)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/aggregate2', async (req, res) => {
    const result = await aggregate2(req.query.year)
    return successResponse(res, result, 'books retrieved successfully')
})

booksRouter.get('/aggregate3', async (req, res) => {
    const result = await aggregate3()
    return successResponse(res, result, 'books retrieved successfully')
})


export default booksRouter