import { parentPort } from 'node:worker_threads'

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
    setInterval(async () => {
      const url = 'http://apilayer.net/api/live?access_key=41f8a78c74c5b699ad4485b1f3dcdfed&source=USD'
      const response = await fetch(url)
      const data = await response.json()
      const dolar = data.quotes.USDCOP
      parentPort.postMessage(dolar)
    }, 60000)
  } catch (error) {
    console.log(error)
  }
}
