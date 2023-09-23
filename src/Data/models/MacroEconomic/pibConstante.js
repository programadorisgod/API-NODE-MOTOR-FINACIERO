import { Schema, model } from 'mongoose'
const pibConstantes = new Schema({
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

const PIBCONST = model('PIBCONSTANTE', pibConstantes)

export default PIBCONST
