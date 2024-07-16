import { Router } from 'express'
import { getInflation, getPIBConst, getPIBCurrent, getTip, getUnemployment, postUnemployment, postDolar, postInflation, postPibConst, postPibCurrent, postTip, getDolar } from '../../controllers/Macro/Macro.js'

const MacroRouter = Router()

const path = '/api/macro/colombia'

MacroRouter.get(`${path}/save/inflacion`, postInflation)
MacroRouter.get(`${path}/save/desempleo`, postUnemployment)
MacroRouter.get(`${path}/save/pib/corriente`, postPibCurrent)
MacroRouter.get(`${path}/save/pib/constante`, postPibConst)
MacroRouter.get(`${path}/save/tip`, postTip)
MacroRouter.get(`${path}/save/dolar`, postDolar)

// Obtener datos


MacroRouter.get(`${path}/inflacion`, getInflation)


MacroRouter.get(`${path}/desempleo`, getUnemployment)


MacroRouter.get(`${path}/pib/corriente`, getPIBCurrent)


MacroRouter.get(`${path}/pib/constante`, getPIBConst)

MacroRouter.get(`${path}/tip`, getTip)

MacroRouter.get(`${path}/dolar`, getDolar)

export default MacroRouter
/**
 * @swagger
 * definitions:
 *   PibCurrentData:
 *     type: object
 *     properties:
 *       year:
 *         type: string
 *         description: Año del dato del PIB corriente
 *       pib:
 *         type: string
 *         description: Valor del PIB corriente
 *   PibConstantData:
 *     type: object
 *     properties:
 *       year:
 *         type: string
 *         description: Año del dato del PIB constante
 *       pib:
 *         type: string
 *         description: Valor del PIB constante
 *   TipData:
 *     type: object
 *     properties:
 *       year_month_day:
 *         type: string
 *         description: Fecha en formato 'YYYY-MM-DD' para la tasa de interés política
 *       tip:
 *         type: number
 *         description: Tasa de interés política
 *   DolarData:
 *     type: object
 *     properties:
 *       year_month_day:
 *         type: string
 *         description: Fecha en formato 'YYYY-MM-DD' para el valor del dólar
 *       dolar:
 *         type: number
 *         description: Valor del dólar en pesos colombianos
 */

/**
 * @swagger
 * /api/macro/colombia/desempleo:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos de desempleo para Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unemploymentData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year_month:
 *                         type: string
 *                         description: Año y mes en formato 'YYYY-MM'
 *                       unemployment:
 *                         type: number
 *                         description: Tasa de desempleo en porcentaje
 *       500:
 *         description: Error al obtener datos de desempleo
 */


/**
 * @swagger
 * /api/macro/colombia/inflacion:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos de inflación para Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year_month:
 *                   type: string
 *                   description: Año y mes de la inflación en formato YYYY-MM
 *                 inflation:
 *                   type: number
 *                   description: Tasa de inflación en porcentaje
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/macro/colombia/pib/corriente:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos del PIB corriente para Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pibCurrentData:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/PibCurrentData'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/macro/colombia/pib/constante:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos del PIB constante para Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pibConstData:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/PibConstantData'
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/macro/colombia/tip:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos de la tasa de interés política (TIP) para Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipData:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/TipData'
 *       500:
 *         description: Error al obtener datos de la TIP
 */

/**
 * @swagger
 * /api/macro/colombia/dolar:
 *   get:
 *     tags:
 *       - Macro
 *     summary: Obtener datos del valor del dólar en Colombia
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dolarData:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/DolarData'
 *       500:
 *         description: Error al obtener datos del valor del dólar
 */