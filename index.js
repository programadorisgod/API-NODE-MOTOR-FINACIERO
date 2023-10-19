import express, { urlencoded } from 'express'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { config } from 'dotenv'
import { Worker } from 'node:worker_threads'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

import { connectDB } from './src/config/Database/conexion.js'
import { getPort } from './src/config/port.js'
import MacroRouter from './src/routes/Macro/Macro.js'
import routerMicro from './src/routes/Micro/Micro.js'
import swaggerDocs from './swagger.js'
const worker = new Worker('./src/controllers/worker/worker.js')
config()

const app = express()
const server = createServer(app)
const io = new Server(server)
let socket = null

const disaretPort = process.env.PORT || 4000

app.disable('x-powered-by')
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(express.json())

connectDB()

app.use(MacroRouter)
app.use(routerMicro)

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.get('/websocket', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

io.on('connection', (clientSocket) => {
  socket = clientSocket
  console.log('a user connected')
  clientSocket.on('disconnect', () => {
    console.log('user disconnected')
    socket = null
  })
})

/** Iniciar el woker */
worker.postMessage('start')
worker.on('message', (message) => {
  console.log(message)
  if (socket) {
    console.log('sending data to client')
    socket.emit('dataReceived', message)
  }
})

getPort(disaretPort).then((port) => {
  server.listen(port, () => {
    console.log(`[Server] Running on port http://localhost:${port}`.yellow.bold)
    swaggerDocs(app, port)
  })
}).catch((err) => {
  console.log(err)
})
