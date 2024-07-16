import { Router } from 'express'
import { getIpc, getMetals, postIpc, postMetals, getAcctionsByName, getActions, postActions, getActionsInital } from '../../controllers/Micro/Micro.js'
const routerMicro = Router()

const path = '/api/micro/colombia'

routerMicro.get(`${path}/save/ipc`, postIpc)

routerMicro.get(`${path}/save/metales`, postMetals)

routerMicro.get(`${path}/ipc`, getIpc)

routerMicro.get(`${path}/metales`, getMetals)


export default routerMicro


// Get Data
/**
 * @swagger
 * /api/micro/colombia/ipc:
 *   get:
 *     tags:
 *       - Micro
 *     summary: Obtener datos del Índice de Precios al Consumidor (IPC) en Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/micro/colombia/metales:
 *   get:
 *     tags:
 *       - Micro
 *     summary: Obtener datos de los precios de metales en Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Error al obtener datos de los precios de metales
 */


