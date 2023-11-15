import * as cheerio from 'cheerio'
import axios from 'axios'

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
      const date = metals[1][0]
      const metalsInfo = metals[1][1]

      return {
        date,
        gold: {
          purchase_price: metalsInfo.oro.compra,
          sales_price: metalsInfo.oro.venta
        },
        silver: {
          purchase_price: metalsInfo.plata.compra,
          sales_price: metalsInfo.plata.venta
        },
        platinum: {
          purchase_price: metalsInfo.platino.compra,
          sales_price: metalsInfo.platino.venta
        }
      }
    })
    const metals = await Metals.create(metalsformtat)
    res.status(201).json(metals)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server internal Error' })
  }
}

export const postActions = async (req, res) => {
  const actions = req.body
  try {
    await Actions.create(actions)
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

export const getActionsInital = async (req, res) => {
  try {
    const inputURL = 'https://es.investing.com/equities/colombia'
    const response = await axios.get(inputURL)
    const $ = cheerio.load(response.data)

    const data = []
    let i = 0

    $('table tbody tr').each((_, row) => {
      if (i <= 24) {
        const name = $(row).find('td:nth-child(2) a').text()
        const last = $(row).find('td:nth-child(3)').text()
        const max = $(row).find('td:nth-child(4)').text()
        const vari = $(row).find('td:nth-child(6)').text()
        const percentVar = $(row).find('td:nth-child(7)').text()
        const vol = $(row).find('td:nth-child(8)').text()
        const hour = $(row).find('td:nth-child(9)').text()

        const company = {
          name,
          data: {
            last,
            max,
            vari,
            percentVar,
            vol,
            hour
          }
        }

        data.push(company)
        i++
      }
    })

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server internal Error' })
  }
}
