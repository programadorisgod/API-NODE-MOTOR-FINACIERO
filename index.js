import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { fileURLToPath } from 'node:url'
import colors from 'colors'
import { Worker } from 'node:worker_threads'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

import { connectDB } from './src/config/Database/conexion.js'
import MacroRouter from './src/routes/Macro/Macro.js'
import routerMicro from './src/routes/Micro/Micro.js'
import swaggerDocs from './swagger.js'
import path from 'node:path'
import { getPort } from './src/config/port.js'

const worker = new Worker('./src/worker/worker.js')
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const disaretPort = process.env.PORT || process.argv[3] || 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathStaticFiles = path.join(__dirname, 'client')
let socket = null


connectDB()

app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
app.use(urlencoded({ extended: true }))
app.use(json())

/* Rutas */
app.use(MacroRouter)
app.use(routerMicro)

/* Estaticos */
app.use('/websocket', express.static(pathStaticFiles))



io.on('connection', (clientSocket) => {
  socket = clientSocket
  clientSocket.on('disconnect', () => {
    socket = null
  })
})


/** Iniciar el woker */
worker.postMessage('start')

worker.on('message', async (event) => {

  if (socket) {
    if (event.message !== 'Actions') socket.emit('dataReceived', event.message)
    socket.emit('accionesReceived', event.data)
  }

})


getPort(disaretPort).then((port) => {
  console.log(port);
  server.listen(port, () => {
    if (process.env.NODE_ENV === 'developtmen')
      console.log(`[Server] Running on port http://localhost:${port}`.yellow.bold)

    swaggerDocs(app, port)
  })
})