import dotenv from 'dotenv'
import { Header } from './interfaces/IServer'
import * as _rest from './lib/rest'
import * as _messagesRouter from './controllers/messages'

dotenv.config()

const {
    REST_PORT,
    CLIENT_PROTOCOL,
    CLIENT_HOST,
    CLIENT_PORT,
    NODE_ENV
} = process.env
const restHeaders: Header[] = [
    {
        key: 'Access-Control-Allow-Origin',
        value: `${CLIENT_PROTOCOL}://${CLIENT_HOST}:${CLIENT_PORT}`
    }
]
const rest = new _rest.RestServer({
    port: REST_PORT
})

if (NODE_ENV !== 'test') {
    _rest.useBodyParser(rest)
    _rest.start(rest)
    _rest.useFingerPrint(rest)
    _rest.setResponseHeaders(rest, restHeaders)
    _messagesRouter.setMessagesRoutes(rest)
}