import dotenv from 'dotenv'
import axios  from 'axios'
import { RestServer } from '../lib/rest'

dotenv.config()

const MESSAGES_API_URL =
    `http://${process.env.MESSAGES_API_REST_HOST}:${process.env.MESSAGES_API_REST_PORT}`

export function setRoutes(rest: RestServer): void {
    const server = rest.getServer()

    server.get('/', passGetRequest)
    server.get('/health-check', healthCheck)
    server.get('/messages', passGetRequest)
    server.get('/messages/:pageIndex', passGetRequest)
    server.get('/last-message/:posterId', passGetRequest)
    
    server.post('/message', passPostRequest)
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