// import { configDotenv , config} from 'dotenv'
import express from 'express' 
import {logger} from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { getAllTask } from './controllers/getAllTasks.js'


// config()

const PORT = process.env.SERVER_PORT

const app = express()

app.use(errorHandler)

app.get('/tasks', getAllTask)


app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
    
})