import dotenv from 'dotenv'
import axios  from 'axios'
import { RestServer } from '../lib/rest'

dotenv.config()

export function setRoutes(rest: RestServer): void {
    const server = rest.getServer()

    server.get('/', documentation)
    server.get('/health-check', healthCheck)
    // server.post('/message', )
    // server.get('/messages', )
    // server.get('/messages/:pageIndex', )
    // server.get('/last-message/:posterId', )
}

export async function documentation(_request: Record<string, any>, response: Record<string, any>): Promise<void> {
    try {
        const apiData =
            await axios(`http://${process.env.MESSAGES_API_REST_HOST}:${process.env.MESSAGES_API_REST_PORT}`)
        
        response.send(apiData.data)
    }
    catch (error) {
        // TODO: set different response codes
        // TODO: figure a way to log errors
        console.error(error)
        response.json({ success: false })
    } 
}

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    response.json({ status: 'online' })
}