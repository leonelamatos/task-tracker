
import { COLLECTION_ID, database, DATABASE_ID,ID } from '../utils/appwriteInit.js'
import { handleAsync } from '../utils/handleAsync.js'
import { logger } from '../utils/logger.js'


export const getAllTask = async (req, res) => {

    const [ error, data ] = await handleAsync(database.listDocuments(DATABASE_ID, COLLECTION_ID))
    
    // if(error) return rej
    const tasks = data.documents

    logger.info(`Data accessed`)
    return res.json(tasks)
}

export const postTasks = async (req, res) => {
    const [error, data] = await handleAsync(database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{...req.body}))
    if (error) {
        logger.error(error.message)
        return
     }
    logger.info('New task created')
    return res.json({
        status: "success",
        task:data
    })
}

export const updateTask = async (req, res) => {
    const { $id } = req.params
    const dataToUpdate = {
        taskName: req.body.taskName,
        type: req.body.type,
        status: req.body.status,
        dueDate: req.body.dueDate,
        creationDate: req.body.creationDate,
        description: req.body.description,
        priority: req.body.priority,
        
    }
    const [error, data] = await handleAsync(database.updateDocument(DATABASE_ID,COLLECTION_ID,$id,dataToUpdate))
    if (error) {
        logger.error(error.message)
        return res.status(error.code).json({
        status: "error",
        error: error
    })
     }
    logger.info('New task created')
    return res.json({
        status: "success",
        task: data
    })
}

export const deleteTask = async (req, res) => {
    const id  = req.params.id
    const [error, data] = await handleAsync(database.deleteDocument(DATABASE_ID,COLLECTION_ID,id))
    if (error) {
        logger.error(error)
        return res.status(error.code).json({
        status: "error",
        error: error.response
    })
     }
    logger.info(`Task with ID ${id} has been deleted`)
    return res.json({
        status: "success",
        $id
    })
}

export const getSingleTask = async (req, res) => {
    const id = req.params.id
    const[ error, data ] = await handleAsync(database.getDocument(DATABASE_ID, COLLECTION_ID, id))
  if (error) {
        // logger.error(error)
        return res.status(error.code).json({
        status: "error",
        error: error.response
    })
     }
    logger.info(`Task with ID ${id} has been returned`)
    return res.json({
        status: "success",
        data
    })}