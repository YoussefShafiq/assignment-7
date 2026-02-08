import { Router } from "express";
import { addLog, aggregate4, getLogs } from "./logs.service.js";
import successResponse from "../../utils/successResponse.js";

const logsRouter = Router()

logsRouter.post("/add", async (req, res) => {
    const result = await addLog(req.body)
    return successResponse(res, result, 'log added successfully', 201)
})

logsRouter.get('/', async (req, res) => {
    const result = await getLogs()
    return successResponse(res, result, 'logs retrieved successfully')

})

logsRouter.get('/aggregate4', async (req, res) => {
    const result = await aggregate4()
    return successResponse(res, result, 'books retrieved successfully')
})


export default logsRouter