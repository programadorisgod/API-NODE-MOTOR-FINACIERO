import { parentPort } from 'node:worker_threads'
import { config } from 'dotenv'
import * as cheerio from 'cheerio'
import axios from 'axios'

config()
parentPort.on('message', async (message) => {
  if (message === 'start') {
    await fetchDolar()
    await getAcciones()
  }
})

parentPort.on('error', (error) => {
  console.log(error)
})

const fetchDolar = async () => {
  try {
    const date = new Date()
    date.setHours(date.getHours() - 5)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const dateNow = `${year}-${month}-${day} ${hour}:${minutes}`
    setInterval(async () => {
      const url = `http://api.currencylayer.com/live?access_key=${process.env.DOLAR_API_KEY}&currencies=COP&format=1`
      const response = await fetch(url)
      const data = await response.json()

      const dolar = data.quotes.USDCOP
      const dataNow = {
        time: dateNow,
        value: dolar
      }
      parentPort.postMessage(dataNow)
    }, 60000)
  } catch (error) {
    console.log(error)
  }
}

async function getAcciones () {
  try {
    setInterval(async () => {
      const inputURL = 'https://es.investing.com/equities/colombia'

      const response = await axios.get(inputURL)
      const $ = cheerio.load(response.data)
      const data = []
      let i = 0
      $('table tbody tr').each((_, row) => {
        if (i <= 24) {
          const nombre = $(row).find('td:nth-child(2) a').text()
          const ultimo = $(row).find('td:nth-child(3)').text()
          const maximo = $(row).find('td:nth-child(4)').text()
          const vari = $(row).find('td:nth-child(6)').text()
          const percentVar = $(row).find('td:nth-child(7)').text()
          const volumen = $(row).find('td:nth-child(8)').text()
          const hora = $(row).find('td:nth-child(9)').text()

          const empresa = {
            nombre,
            datos: {
              ultimo,
              maximo,
              vari,
              percentVar,
              volumen,
              hora
            }
          }

          data.push(empresa)
          i++
        }
      })

      parentPort.postMessage({ message: 'Acciones', data })
    }, 60000)
  } catch (error) {
    console.log(error)
  }
}
