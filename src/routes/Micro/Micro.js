import { Router } from 'express'
import { PostIpc, PostMetales } from '../../controllers/Micro/Micro.js'

const routerMicro = new Router()

const path = '/micro'

routerMicro.get(`${path}/ipc`, PostIpc)
routerMicro.get(`${path}/metales`, PostMetales)

export default routerMicro
