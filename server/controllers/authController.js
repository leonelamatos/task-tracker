import { ID, users } from '../utils/appwriteInit.js'
import { handleAsync } from '../utils/handleAsync.js'
import { logger } from '../utils/logger.js'

export const postCreateUserAccount = async (req, res) => {
    const { email, password , userName} = req.body
    
    const [ error, data ] = await handleAsync(users.createArgon2User(ID.unique(),email,password,userName))
    
    console.log(data)

    if (error) {
        logger.error('Error creating user ' + error.message)
        return res.status(error.code).json(error)
        
    }

    logger.info('New user created')

    return res.json(data)
    
}

// export const postLoginUser = async (req, res) => {
//     const { email, password , userName} = req.body
    
//     const [ error, data ] = await handleAsync(users.(email,password))
    
//     console.log(data)

//     if (error) {
//         logger.error('Error creating user session ' + error.message)
//         return res.status(error.code).json(error)
        
//     }

//     logger.info('User sesion created')

//     return res.json(data)
    
// }