import { Router } from 'express'
import { GetIpc, GetMetales, GetAcciones, PostIpc, PostMetales } from '../../controllers/Micro/Micro.js'

const routerMicro = new Router()

const path = '/API/Micro'

routerMicro.get(`${path}/ipc`, PostIpc)
routerMicro.get(`${path}/metales`, PostMetales)

// Get Data
/**
 * @swagger
 * definitions:
 *   IpcData:
 *     type: object
 *     properties:
 *       date:
 *         type: string
 *         description: Fecha en formato 'YYYY-MM-DD' para el dato del IPC
 *       indice:
 *         type: number
 *         description: Índice del IPC
 *       annual_inflation:
 *         type: number
 *         description: Inflación anual
 *       monthly_inflation:
 *         type: number
 *         description: Inflación mensual
 *       annual_current_inflation:
 *         type: number
 *         description: Inflación actual anual
 *   MetalesData:
 *     type: object
 *     properties:
 *       date:
 *         type: string
 *         description: Fecha en formato 'YYYY-MM-DD' para los datos de precios de metales
 *       gold:
 *         type: object
 *         properties:
 *           purchase_price:
 *             type: number
 *             description: Precio de compra del oro
 *           sales_price:
 *             type: number
 *             description: Precio de venta del oro
 *       silver:
 *         type: object
 *         properties:
 *           purchase_price:
 *             type: number
 *             description: Precio de compra de la plata
 *           sales_price:
 *             type: number
 *             description: Precio de venta de la plata
 *       platinum:
 *         type: object
 *         properties:
 *           purchase_price:
 *             type: number
 *             description: Precio de compra del platino
 *           sales_price:
 *             type: number
 *             description: Precio de venta del platino
 *   AccionesData:
 *     type: object
 *     properties:
 *       nemotecnico:
 *         type: string
 *         description: Nemotécnico de la acción
 *       name:
 *         type: string
 *         description: Nombre de la empresa
 *       code:
 *         type: string
 *         description: Código de la acción
 *       percentage_change:
 *         type: string
 *         description: Cambio porcentual
 *       volumes:
 *         type: string
 *         description: Volumen de transacciones
 *       last_price:
 *         type: string
 *         description: Último precio
 *       amount:
 *         type: string
 *         description: Monto
 *       absolute_change:
 *         type: string
 *         description: Cambio absoluto
 *       open_price:
 *         type: string
 *         description: Precio de apertura
 *       max_price:
 *         type: string
 *         description: Precio máximo
 *       min_price:
 *         type: string
 *         description: Precio mínimo
 *       average_price:
 *         type: string
 *         description: Precio promedio
 *       date:
 *         type: string
 *         description: Fecha en formato 'YYYY-MM-DD'
 */

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
routerMicro.get(`${path}/ipc/Colombia`, GetIpc)

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

routerMicro.get(`${path}/metales/Colombia`, GetMetales)

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
routerMicro.get(`${path}/acciones/Empresas`, GetAcciones)
export default routerMicro
