import express from "express";
import { NODE_ENV, PORT } from "../configs/app.config.js";
import { testDbConnection } from "./DB/connection.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import booksRouter from "./Modules/Books/books.controller.js";
import logsRouter from "./Modules/Logs/logs.controller.js";



export default async function bootstrap() {
    const app = express();
    await testDbConnection()
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/books', booksRouter)
    app.use('/logs', logsRouter)
    app.use((err, req, res, next) => {
        return NODE_ENV == 'dev' ?
            res.status(err.cause?.statusCode || 500).json({
                success: false,
                message: err.name === 'SequelizeUniqueConstraintError' ? `${err.errors[0]?.path || 'field'} '${err.errors[0]?.value || ''}' already exists` : err.message,
                stack: err.stack,
                err
            })
            :
            res.status(err.cause?.statusCode || 500).json({
                success: false,
                message: err.name === 'SequelizeUniqueConstraintError' ? `${err.errors[0]?.path || 'field'} '${err.errors[0]?.value || ''}' already exists` : err.message,
            })
    })

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

    app.all('*d', (req, res) => {
        return res.status(400).json({
            success: false,
            message: 'invalid route or method'
        })
    })
}