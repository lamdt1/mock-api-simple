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
        handler: (req, h) => {
            console.log('Request register ======', req)
            setTimeout(() => {
                return res.send({ "message": { "shared_token": "ZsPitF57" } })
            }, Math.floor((Math.random() * 5000) + 100))
        }
    })

    server.route({
        path: '/api/verify',
        method: 'POST',
        handler: (req, h) => {
            console.log('Request verify ======', req)
            setTimeout(() => {
                return res.send({ "code": "SUCCESS" })
            }, Math.floor((Math.random() * 5000) + 100))
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
        path: '/upload',
        method: 'POST',
        options: {
            payload: {
                output: 'stream'
            }
        },
        handler: async (req, h) => {
            const { payload } = req

            const response = handleFileUpload(payload.file)
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

init()