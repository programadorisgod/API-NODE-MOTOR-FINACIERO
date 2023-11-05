import Actions from '../../Data/models/MicroEconomic/acciones.js'
import Ipc from '../../Data/models/MicroEconomic/ipc.js'
import Metals from '../../Data/models/MicroEconomic/metales.js'

export const postIpc = async (req, res) => {
  try {
    const ipcresponse = await fetch('https://mpf.fly.dev/ipc')
    const ipcdata = await ipcresponse.json()

    const ipcformtat = Object.entries(ipcdata).map((ipc) => {
      return {

        date: ipc[0],
        indice: ipc[1].indice,
        annual_inflation: ipc[1].inflacion_anual,
        monthly_inflation: ipc[1].inflacion_mensual,
        annual_current_inflation: ipc[1].inflacion_corriente_anual

      }
    })

    const ipc = await Ipc.create(ipcformtat)
    res.status(201).json(ipc)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const postMetals = async (req, res) => {
  try {
    const metalsresponse = await fetch('https://mpf.fly.dev/metales')
    const metalsdata = await metalsresponse.json()

    const metalsformtat = Object.entries(metalsdata).map((metals) => {
      return {
        date: metals[0],
        gold: {
          purchase_price: metals[1].oro.compra,
          sales_price: metals[1].oro.venta
        },
        silver: {
          purchase_price: metals[1].plata.compra,
          sales_price: metals[1].plata.venta
        },
        platinum: {
          purchase_price: metals[1].platino.compra,
          sales_price: metals[1].platino.venta
        }

      }
    })
    const metals = await Metals.create(metalsformtat)
    res.status(201).json(metals)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const postActions = async (actions) => {
  try {
    const actionsDB = await Actions.find().maxTimeMS(60000)

    for (let index = 0; index < actionsDB.length; index++) {
      const element = actionsDB[index]
      const action = actions[index]

      if (element.name === action.name && element?.data?.last !== action?.data?.last) {
        await Actions.create(action)
        console.log('Holas', element?.data?.last, action?.data?.last)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const getAcctionsByName = async (req, res) => {
  const { name } = req.params
  try {
    const action = await Actions.find({ name })
    console.log(action)

    if (action) {
      res.status(200).json({ data: action })
    }
  } catch (error) {
    console.log(error)
  }
}
// Get Data
export const getMetals = async (req, res) => {
  try {
    const metales = await Metals.find().maxTimeMS(30000)
    res.status(200).json(metales)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const getActions = async (req, res) => {
  try {
    const acciones = await Actions.find().maxTimeMS(30000)
    res.status(200).json(acciones)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const getIpc = async (req, res) => {
  try {
    const ipc = await Ipc.find().maxTimeMS(30000)
    res.status(200).json(ipc)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}
