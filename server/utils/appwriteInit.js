import { Client, Databases,ID, Users} from 'node-appwrite'

const client = new Client()

client.setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('686e9091002ccc1084b6')
    .setKey(process.env.APPWRITE_API_KEY)



const DATABASE_ID = process.env.APPWRITE_DATABASE_ID
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID


const database = new Databases(client)
const users = new Users(client)


export {DATABASE_ID,COLLECTION_ID,database,ID, users}