import Ipc from '../../Data/models/MicroEconomic/ipc.js'
import Metales from '../../Data/models/MicroEconomic/metales.js'

export const PostIpc = async (req, res) => {
  try {
    const ipcresponse = await fetch('http://127.0.0.1:8000/ipc')
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
    console.log(error)
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const PostMetales = async (req, res) => {
  try {
    const metalesresponse = await fetch('http://127.0.0.1:8000/metales')
    const metalesdata = await metalesresponse.json()

    const metalesformtat = Object.entries(metalesdata).map((metales) => {
      return {
        date: metales[0],
        gold: {
          purchase_price: metales[1].oro.compra,
          sales_price: metales[1].oro.venta
        },
        silver: {
          purchase_price: metales[1].plata.compra,
          sales_price: metales[1].plata.venta
        },
        platinum: {
          purchase_price: metales[1].platino.compra,
          sales_price: metales[1].platino.venta
        }

      }
    })
    const metales = await Metales.create(metalesformtat)
    res.status(201).json(metales)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const GetIpc = async (req, res) => {
  try {
    const ipc = await Ipc.find()
    res.status(200).json(ipc)
  } catch (error) {
    res.status(500).json({ error: 'Server internal Error' })
  }
}
