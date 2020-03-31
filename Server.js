const Hapi = require('hapi')
const Inert = require('inert')
const fs = require('fs')

const server = Hapi.Server({ port: 3000 })

const init = async () => {
    await server.register(Inert)

    server.route({
        path: '/',
        method: 'GET',
        handler: (req, h) => ({ message: 'Hello Hapi.js' })
    })

    server.route({
        path: '/api/register',
        method: 'POST',
        handler: async (req, h) => {
            console.log('Request register ======')
            const response = handleResponse({ "message": { "shared_token": "ZsPitF57" } })
            return response
        }
    })

    server.route({
        path: '/api/verify',
        method: 'POST',
        handler: async (req, h) => {
            console.log('Request verify ======')
            const response = handleResponse({ "code": "SUCCESS" })
            return response
        }
    })

    server.route({
        method: 'GET',
        path: '/upload/{file*}',
        handler: {
            directory: {
                path: 'upload'
            }
        }
    })

    server.route({
        path: '/api/upload',
        method: 'POST',
        options: {
            payload: {
                maxBytes: 900 * 1024 * 1024,
                parse: true,
                output: 'stream'
            }
        },
        handler: async (req, h) => {
            const { payload } = req
            console.log('Request upload ======')

            const response = await handleFileUpload(payload.file)
            return response
        }
    })

    await server.start()
}

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename
        const data = file._data

        fs.writeFile(`./upload/${filename}`, data, err => {
            if (err) {
                reject(err)
            }
            resolve({ "code": "SUCCESS" })
        })
    })
}

const handleResponse = msg => {
    return new Promise((resolve, reject) => {
        setTimeout(
            resolve(msg), Math.floor((Math.random() * 5000) + 100)
        )
    })
}


init()