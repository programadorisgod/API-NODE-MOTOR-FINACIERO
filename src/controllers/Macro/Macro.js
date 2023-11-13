import Inflation from '../../Data/models/MacroEconomic/inflacion.js'
import Unemployment from '../../Data/models/MacroEconomic/desempleo.js'
import PIBCURRENT from '../../Data/models/MacroEconomic/pibcorrientes.js'
import PIBCONST from '../../Data/models/MacroEconomic/pibConstante.js'
import Tip from '../../Data/models/MacroEconomic/tip.js'
import DOLAR from '../../Data/models/MacroEconomic/dolar.js'
import { getDate } from '../../helpers/getDate.js'

export const postInflation = async (req, res) => {
  try {
    const inflation = await fetch('https://mpf.fly.dev/inflacion')
    const inflationJson = await inflation.json()

    // eslint-disable-next-line camelcase
    const inflationFormat = Object.entries(inflationJson).map((inflation) => {
      return {
        // eslint-disable-next-line camelcase
        year_month: inflation[0],
        inflation: inflation[1]
      }
    })

    const inflationData = await Inflation.create(inflationFormat)

    res.status(200).json({ inflationData })
  } catch (error) {
    res.status(500).json({ message: 'Error saving inflation data' })
  }
}

export const postUnemployment = async (req, res) => {
  try {
    const unemployment = await fetch('https://mpf.fly.dev/desempleo')
    const unemploymentJson = await unemployment.json()

    const unemploymentFormat = Object.entries(unemploymentJson).map((unemployment) => {
      return {
        year_month: unemployment[0],
        unemployment: unemployment[1]
      }
    })

    const unemploymentData = await Unemployment.create(unemploymentFormat)

    res.status(200).json({ unemploymentData })
  } catch (error) {
    res.status(500).json({ message: 'Error saving unemployment data' })
  }
}

export const postPibCurrent = async (req, res) => {
  try {
    const pibCurrent = await fetch('https://mpf.fly.dev/pib_corrientes')
    const pibCurrentJson = await pibCurrent.json()

    const pibCurrentFormat = Object.entries(pibCurrentJson).map((pibCurrent) => {
      return {
        year: pibCurrent[0],
        pib: pibCurrent[1]
      }
    })

    const pibCurrentData = await PIBCURRENT.create(pibCurrentFormat)

    res.status(200).json({ pibCurrentData })
  } catch (error) {
    res.status(500).json({ message: 'Error saving pibCurrent data' })
  }
}

export const postPibConst = async (req, res) => {
  try {
    const pibConst = await fetch('https://mpf.fly.dev/pib_constantes')
    const pibCurrentJson = await pibConst.json()

    const pibConstFormat = Object.entries(pibCurrentJson).map((pibConst) => {
      return {
        year: pibConst[0],
        pib: pibConst[1]
      }
    })

    const pibConsttData = await PIBCONST.create(pibConstFormat)

    res.status(200).json({ pibConsttData })
  } catch (error) {
    res.status(500).json({ message: 'Error saving pibCurrent data' })
  }
}

export const postTip = async (req, res) => {
  try {
    const tip = await fetch('https://mpf.fly.dev/tip')
    const tipJson = await tip.json()

    const tipFormat = Object.entries(tipJson).map((tip) => {
      return {
        year_month_day: tip[0],
        tip: tip[1]
      }
    })

    const tipData = await Tip.create(tipFormat)

    res.status(200).json({ tipData })
  } catch (error) {
    res.status(500).json({ message: 'Error saving tip data' })
  }
}

export const postDolar = async (req, res) => {
  try {
    const dolar = await fetch('https://mpf.fly.dev/dolar')
    const dolarJson = await dolar.json()

    const dolarFormat = Object.entries(dolarJson).filter((dolar) => {
      const date = getDate()
      const day = date.split(' ')[0].split('-')[2]

      const dolarDate = dolar[1].vigenciahasta.split('T')
      const dolarVigence = dolar[1].vigenciadesde.split('T')
      const dayDolar = dolarDate[0].split('-')[2]
      const dayVigence = dolarVigence[0].split('-')[2]

      if (parseInt(dayVigence) < parseInt(day)) {
        return true
      }

      if (parseInt(dayDolar) > parseInt(day)) {
        return false
      }

      return true
    }).map((dolar) => {
      return {
        year_month_day: dolar[0],
        dolar: dolar[1].valor
      }
    })

    await DOLAR.deleteMany().maxTimeMS(60000)

    const dolarData = await DOLAR.create(dolarFormat)

    res.status(200).json({ dolarData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error saving dolar data' })
  }
}

// Get Data
export const getTip = async (req, res) => {
  try {
    const tipData = await Tip.find().maxTimeMS(30000)

    res.status(200).json({ tipData })
  } catch (error) {
    res.status(500).json({ message: 'Error getting tip data' })
  }
}

export const getDolar = async (req, res) => {
  try {
    const dolarData = await DOLAR.find().maxTimeMS(30000)
    const dataSort = dolarData.sort((a, b) => {
      const dateA = new Date(a.year_month_day)
      const dateB = new Date(b.year_month_day)
      return dateB - dateA
    })
    res.status(200).json({ dataSort })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting dolar data' })
  }
}

export const getPIBCurrent = async (req, res) => {
  try {
    const pibCurrentData = await PIBCURRENT.find()

    res.status(200).json({ pibCurrentData })
  } catch (error) {
    res.status(500).json({ message: 'Error getting pibCurrent data' })
  }
}

export const getPIBConst = async (req, res) => {
  try {
    const pibConstData = await PIBCONST.find().maxTimeMS(30000)

    res.status(200).json({ pibConstData })
  } catch (error) {
    res.status(500).json({ message: 'Error getting pibConst data' })
  }
}

export const getUnemployment = async (req, res) => {
  try {
    const unemploymentData = await Unemployment.find().maxTimeMS(30000)

    res.status(200).json({ unemploymentData })
  } catch (error) {
    res.status(500).json({ message: 'Error getting unemployment data' })
  }
}
export const getInflation = async (req, res) => {
  try {
    const inflationData = await Inflation.find().maxTimeMS(30000)

    res.status(200).json({ inflationData })
  } catch (error) {
    res.status(500).json({ message: 'Error getting inflation data' })
  }
}
