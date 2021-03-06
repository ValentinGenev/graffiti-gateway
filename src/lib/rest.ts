import express from 'express'
import bodyParser from 'body-parser'
import fingerprint from 'express-fingerprint'
import { Header } from '../interfaces/IServer'

interface ServerConfiguration {
    port?: string
}

export class RestServer {
    private server: express.Express
    private port: string | undefined

    constructor(configuration: ServerConfiguration) {
        this.port = configuration.port
        this.server = express()
    }

    public getServer(): express.Express {
        return this.server
    }
    public getPort(): string | undefined {
        return this.port
    }
}

export function useBodyParser(rest: RestServer): void {
    rest.getServer().use(bodyParser.json())
}

export function useFingerPrint(rest: RestServer): void {
    rest.getServer().use(fingerprint())
}

export function setResponseHeaders(
    rest: RestServer,
    headers: Header[]
): void {
    rest.getServer().use((_request, response, next) => {
        for (const header of headers) {
            response.append(header.key, header.value)
        }

        next()
    })
}

export function start(rest: RestServer): void {
    const server = rest.getServer()
    const port = rest.getPort() ? rest.getPort() : '5000'

    server.listen(port, () => {
        console.log(`Server listening on: localhost:${port}`)
    })
}