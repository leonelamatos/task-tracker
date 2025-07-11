// import { configDotenv , config} from 'dotenv'
import express from 'express' 
import {logger} from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { getAllTask, postTasks } from './controllers/tasksControllers.js'
import cors from 'cors'


// config()

const PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.use(errorHandler)
app.use(cors({origin:'http://localhost:5173'}))

app.get('/tasks', getAllTask)
app.post('/tasks', postTasks)


app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
    
})