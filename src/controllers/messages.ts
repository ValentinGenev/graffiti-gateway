import dotenv from 'dotenv'
import axios  from 'axios'
import { RestServer } from '../lib/rest'

dotenv.config()

const {
    MESSAGES_API_HOST,
    MESSAGES_API_PORT,
    MESSAGES_API_PATH
} = process.env
const MESSAGES_API_URL =
    `http://${MESSAGES_API_HOST}:${MESSAGES_API_PORT}`

export function setMessagesRoutes(rest: RestServer): void {
    const server = rest.getServer()

    server.get(`${MESSAGES_API_PATH}/`, passGetRequest)
    server.get(`${MESSAGES_API_PATH}/health-check`, healthCheck)
    server.get(`${MESSAGES_API_PATH}/all`, passGetRequest)
    server.get(`${MESSAGES_API_PATH}/all/:pageIndex`, passGetRequest)
    server.get(`${MESSAGES_API_PATH}/last/:posterId`, passGetRequest)
    
    server.post(`${MESSAGES_API_PATH}/new`, passPostRequest)
}

async function passGetRequest(request: Record<string, any>, response: Record<string, any>): Promise<void> {
    const apiData = await axios.get(`${MESSAGES_API_URL}${request.originalUrl}`)
    
    response.json(apiData.data) 
}

async function passPostRequest(request: Record<string, any>, response: Record<string, any>): Promise<void> {
    const apiData = await axios.post(
        `${MESSAGES_API_URL}${request.originalUrl}`,
        request.body,
        {
            headers: {
                'Fingerprint': request.fingerprint.hash
            }
        })
    
    response.json(apiData.data)
}

function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    response.json({ status: 'online' })
}