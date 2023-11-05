import { parentPort } from 'node:worker_threads'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { getDate } from '../../helpers/getDate.js'

parentPort.on('message', async (message) => {
  if (message === 'start') {
    await fetchDolar()
    await getActions()
    fetchDolarData()
  }
})

parentPort.on('error', (error) => {
  console.log(error)
})

const fetchDolar = async () => {
  try {
    setInterval(async () => {
      const url = `http://api.currencylayer.com/live?access_key=${process.env.DOLAR_API_KEY}&currencies=COP&format=1`
      const response = await fetch(url)
      const data = await response.json()

      const dateNow = getDate()

      const dolar = data?.quotes?.USDCOP

      const dataNow = {
        time: dateNow,
        value: dolar
      }

      parentPort.postMessage(dataNow)
    }, 60000)
  } catch (error) {
    console.log(error, 'error dolar')
  }
}

async function getActions () {
  try {
    setInterval(async () => {
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

        parentPort.postMessage({ message: 'Actions', data })
      } catch (error) {
        console.log(error, 'Error acciones')
      }
    }, 72000000)
  } catch (error) {
    console.log(error, 'Error acciones')
  }
}

function fetchDolarData () {
  try {
    setInterval(async () => {
      try {
        const response = await fetch('http://localhost:4000/API/Macro/Dolar')

        if (response.status === 200) {
          console.log('Dolar actualizado')
        } else {
          const data = await response.json()
          console.log(data)
        }
      } catch (error) {
        console.log(error, 'Error dolar actualizar')
      }
    }, 54000000)
  } catch (error) {
    console.log(error, 'Error dolar actualizar')
  }
}
