import { parentPort } from 'node:worker_threads'
import { config } from 'dotenv'
config()
parentPort.on('message', (message) => {
  if (message === 'start') {
    fetchDolar()
  }
})

parentPort.on('error', (error) => {
  console.log(error)
})

const fetchDolar = async () => {
  try {
    const date = new Date()
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
