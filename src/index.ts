import dotenv from 'dotenv'
import * as _rest from './lib/rest'
import * as _messagesRouter from './controllers/messages'

dotenv.config()

export const rest = new _rest.RestServer({
    port: process.env.REST_PORT
})

if (process.env.NODE_ENV !== 'test') {
    _rest.useBodyParser(rest)
    _rest.start(rest)
    _rest.useFingerPrint(rest)
    _messagesRouter.setMessagesRoutes(rest)
}