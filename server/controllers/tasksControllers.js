
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
        data
    })

}