import express, { json, urlencoded } from 'express'
import cors from 'cors'

// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { Worker } from 'node:worker_threads'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

import { connectDB } from './src/config/Database/conexion.js'
import MacroRouter from './src/routes/Macro/Macro.js'
import routerMicro from './src/routes/Micro/Micro.js'
import swaggerDocs from './swagger.js'

const worker = new Worker('./src/controllers/worker/worker.js')

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let socket = null
const disaretPort = process.env.PORT ?? 4000
connectDB()

app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
app.use(urlencoded({ extended: true }))
app.use(json())

/* Rutas */
app.use(MacroRouter)
app.use(routerMicro)

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World!' })
})

app.get('/websocket', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

io.on('connection', (clientSocket) => {
  socket = clientSocket
  // console.log('a user connected')

  clientSocket.on('disconnect', () => {
    socket = null
  })
})

/** Iniciar el woker */
worker.postMessage('start')

worker.on('message', async (message) => {
  if (socket !== null && message.message !== 'Actions') {
    socket.emit('dataReceived', message)
  }

  if (socket && message.message === 'Actions') {
  //  console.log('sending acciones to client')
    socket.emit('accionesReceived', message.data)
  }
})

server.listen(disaretPort, () => {
  console.log(`[Server] Running on port http://localhost:${disaretPort}`.yellow.bold)
  swaggerDocs(app, disaretPort)
})
