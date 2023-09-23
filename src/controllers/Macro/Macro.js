import Inflation from '../../Data/models/MacroEconomic/inflacion.js'
import Unemployment from '../../Data/models/MacroEconomic/desempleo.js'
import PIBCURRENT from '../../Data/models/MacroEconomic/pibcorrientes.js'
import PIBCONST from '../../Data/models/MacroEconomic/pibConstante.js'
import Tip from '../../Data/models/MacroEconomic/tip.js'
import DOLAR from '../../Data/models/MacroEconomic/dolar.js'

export const PostInflation = async (req, res) => {
  try {
    const inflation = await fetch('http://127.0.0.1:8000/inflacion')
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
    console.log(error)
    res.status(500).json({ message: 'Error saving inflation data' })
  }
}

export const PostDesempleo = async (req, res) => {
  try {
    const unemployment = await fetch('http://127.0.0.1:8000/desempleo')
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
    console.log(error)
    res.status(500).json({ message: 'Error saving unemployment data' })
  }
}

export const PostPibCurrent = async (req, res) => {
  try {
    const pibCurrent = await fetch('http://127.0.0.1:8000/pib_corrientes')
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
    console.log(error)
    res.status(500).json({ message: 'Error saving pibCurrent data' })
  }
}

export const PostPibConst = async (req, res) => {
  try {
    const pibConst = await fetch('http://127.0.0.1:8000/pib_constantes')
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
    console.log(error)
    res.status(500).json({ message: 'Error saving pibCurrent data' })
  }
}

export const PostTip = async (req, res) => {
  try {
    const tip = await fetch('http://127.0.0.1:8000/tip')
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
    console.log(error)
    res.status(500).json({ message: 'Error saving tip data' })
  }
}

export const PostDolar = async (req, res) => {
  try {
    const dolar = await fetch('http://127.0.0.1:8000/dolar')
    const dolarJson = await dolar.json()

    const dolarFormat = Object.entries(dolarJson).map((dolar) => {
      return {
        year_month_day: dolar[0],
        dolar: dolar[1]
      }
    }
    )

    const dolarData = await DOLAR.create(dolarFormat)

    res.status(200).json({ dolarData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error saving dolar data' })
  }
}

// Obtener las macro
export const GetTip = async (req, res) => {
  try {
    const tipData = await Tip.find()

    res.status(200).json({ tipData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting tip data' })
  }
}

export const getDolar = async (req, res) => {
  try {
    const dolarData = await DOLAR.find()

    res.status(200).json({ dolarData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting dolar data' })
  }
}

export const GetPIBCurrent = async (req, res) => {
  try {
    const pibCurrentData = await PIBCURRENT.find()

    res.status(200).json({ pibCurrentData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting pibCurrent data' })
  }
}

export const GetPIBConst = async (req, res) => {
  try {
    const pibConstData = await PIBCONST.find()

    res.status(200).json({ pibConstData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting pibConst data' })
  }
}

export const GetUnemployment = async (req, res) => {
  try {
    const unemploymentData = await Unemployment.find()

    res.status(200).json({ unemploymentData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting unemployment data' })
  }
}
export const GetInflation = async (req, res) => {
  try {
    const inflationData = await Inflation.find()

    res.status(200).json({ inflationData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error getting inflation data' })
  }
}
