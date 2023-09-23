import { Schema, model } from 'mongoose'
const pibCorrientes = new Schema({
  year: {
    type: String,
    required: true
  },
  pib: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

const PIBCURRENT = model('PIBCORRIENTE', pibCorrientes)

export default PIBCURRENT
