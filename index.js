import express, { urlencoded } from 'express'
import cors from 'cors'
// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { config } from 'dotenv'
import { connectDB } from './src/config/Database/conexion.js'
import { getPort } from './src/config/port.js'
import MacroRouter from './src/routes/Macro/Macro.js'
import routerMicro from './src/routes/Micro/Micro.js'
import swaggerDocs from './swagger.js'
config()

const app = express()
const disaretPort = process.env.PORT || 3000
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

getPort(disaretPort).then((port) => {
  app.listen(port, () => {
    console.log(`[Server] Running on port http://localhost:${port}`.yellow.bold)
    swaggerDocs(app, port)
  })
}).catch((err) => {
  console.log(err)
})
