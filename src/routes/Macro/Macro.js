import { Router } from 'express'
import { GetInflation, GetPIBConst, GetPIBCurrent, GetTip, GetUnemployment, PostDesempleo, PostDolar, PostInflation, PostPibConst, PostPibCurrent, PostTip, getDolar } from '../../controllers/Macro/Macro.js'
const MacroRouter = Router()

const path = '/API/Macro'

MacroRouter.get(`${path}`, PostInflation)
MacroRouter.get(`${path}/Desempleo`, PostDesempleo)
MacroRouter.get(`${path}/PibCorriente`, PostPibCurrent)
MacroRouter.get(`${path}/PibConstante`, PostPibConst)
MacroRouter.get(`${path}/tip`, PostTip)
MacroRouter.get(`${path}/Dolar`, PostDolar)

// Obtener datos
MacroRouter.get(`${path}/Inflacion`, GetInflation)
MacroRouter.get(`${path}/Desempleo/Colombia`, GetUnemployment)
MacroRouter.get(`${path}/PibCorriente/Colombia`, GetPIBCurrent)
MacroRouter.get(`${path}/PibConstante/Colombia`, GetPIBConst)
MacroRouter.get(`${path}/Tip`, GetTip)
MacroRouter.get(`${path}/Dolar/Colombia`, getDolar)
export default MacroRouter
