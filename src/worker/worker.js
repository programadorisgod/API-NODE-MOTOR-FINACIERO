import { parentPort } from 'node:worker_threads'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { getDate } from '../helpers/getDate.js'
import fetchData from '../helpers/fetch.js'

parentPort.on('message', async (message) => {
  if (message === 'start') {
    await fetchDolar()
    // await postActionsData()
    fetchDolarData()
  }
})

parentPort.on('error', (error) => {
  console.log(error)
})

const fetchDolar = async () => {

  setInterval(async () => {
    const url = `http://api.currencylayer.com/live?access_key=${process.env.DOLAR_API_KEY}&currencies=COP&format=1`

    const response = await fetchData(url)

    if (response == undefined)
      console.log(error, 'error dolar')

    const dateNow = getDate()

    const dolar = response?.quotes?.USDCOP

    const dataNow = {
      time: dateNow,
      value: dolar
    }

    parentPort.postMessage(dataNow)
  }, 54000000)

}




function fetchDolarData() {

  setInterval(async () => {
    const url = 'https://api-node-motor-finaciero-production.up.railway.app/API/Macro/Dolar'
    const response = await fetchData(url)
    if (response == undefined) {
      console.log('Error al actualizar el dolor')
    }

  }, 54000000)

}
