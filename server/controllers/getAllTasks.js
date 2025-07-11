
import { COLLECTION_ID, database, DATABASE_ID } from '../utils/appwriteInit.js'
import { handleAsync } from '../utils/handleAsync.js'
import { logger } from '../utils/logger.js'


export const getAllTask = async (req, res) => {

    const [ error, data ] = await handleAsync(database.listDocuments(DATABASE_ID, COLLECTION_ID))
    
    // if(error) return rej
    const tasks = data.documents

    logger.info(`data accessed`)
    return res.json(tasks)
}