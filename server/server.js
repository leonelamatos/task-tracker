// import { configDotenv , config} from 'dotenv'
import express from 'express' 
import {logger} from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { deleteTask, getAllTask, getTaskById, postTasks, updateTask } from './controllers/tasksControllers.js'
import cors from 'cors'

const PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.use(errorHandler)
app.use(cors({origin:'http://localhost:5173'}))

app.get('/api/tasks', getAllTask)
app.get('/api/tasks/:id', getTaskById)
app.post('/api/tasks', postTasks)
app.put('/api/tasks/:id', updateTask)
app.delete('/api/tasks/:id', deleteTask)

app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
    
})