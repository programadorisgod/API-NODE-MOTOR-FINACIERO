import { Router } from 'express'
import { getIpc, getMetals, postIpc, postMetals, getAcctionsByName, getActions } from '../../controllers/Micro/Micro.js'
const routerMicro = new Router()

const path = '/API/Micro'

routerMicro.get(`${path}/ipc`, postIpc)
routerMicro.get(`${path}/metales`, postMetals)

// Get Data
/**
 * @swagger
 * /API/Micro/ipc/Colombia:
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
 *               items:
 *                 $ref: '#/definitions/IpcData'
 *       500:
 *         description: Internal Server Error
 */
routerMicro.get(`${path}/ipc/Colombia`, getIpc)

/**
 * @swagger
 * /API/Micro/metales/Colombia:
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
 *               items:
 *                 $ref: '#/definitions/MetalesData'
 *       500:
 *         description: Error al obtener datos de los precios de metales
 */

routerMicro.get(`${path}/metales/Colombia`, getMetals)

/**
 * @swagger
 * /API/Micro/acciones/Empresas:
 *   get:
 *     tags:
 *       - Micro
 *     summary: Obtener datos de acciones de empresas
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/AccionesData'
 *       500:
 *         description: Error al obtener datos de acciones de empresas
 */
routerMicro.get(`${path}/acciones/Empresas`, getActions)

routerMicro.get(`${path}/acciones/:name`, getAcctionsByName)
export default routerMicro
