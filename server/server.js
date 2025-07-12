// import { configDotenv , config} from 'dotenv'
import express from 'express' 
import {logger} from './utils/logger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { deleteTask, getAllTask, getSingleTask, postTasks, updateTask } from './controllers/tasksControllers.js'
import cors from 'cors'
import { postCreateUserAccount, postLoginUser } from './controllers/authController.js'


// config()

const PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.use(errorHandler)
app.use(cors({origin:'http://localhost:5173'}))

app.get('/tasks', getAllTask)
app.get('/tasks/:id', getSingleTask)
app.post('/tasks', postTasks)
app.put('/tasks/:id', updateTask)
app.delete('/tasks/:$id', deleteTask)
app.post('/auth/login', postLoginUser)
app.post('/auth/singup', postCreateUserAccount)


app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
    
})