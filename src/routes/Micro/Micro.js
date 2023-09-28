import { Router } from 'express'
import { PostAcciones, PostIpc, PostMetales } from '../../controllers/Micro/Micro.js'

const routerMicro = new Router()

const path = '/micro'

routerMicro.get(`${path}/ipc`, PostIpc)
routerMicro.get(`${path}/metales`, PostMetales)
routerMicro.get(`${path}/acciones`, PostAcciones)

export default routerMicro
