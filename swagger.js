// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = fileURLToPath(import.meta.url)

const swaggerDocumentOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API Microservicio',
      version: '1.0.0',
      description: 'API Microservicio'
    },
    servers: [
      {
        url: `${process.env.HOST}`
      }
    ]
  },
  apis: [
    `${path.join(__dirname, '../src/routes/Macro/*.js')}`,
   `${path.join(__dirname, '../src/routes/Micro/*.js')}`
  ]
}
const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerDocumentOptions)))
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerJSDoc(swaggerDocumentOptions))
  }
  )
  console.log(`Swagger Docs running on port http://localhost:${port}/api-docs`.blue.bold)
}

export default swaggerDocs
