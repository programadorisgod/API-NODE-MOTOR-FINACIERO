import { Schema, model } from 'mongoose'

const DolarSchema = new Schema({
  year_month_day: {
    type: String,
    required: true
  },
  dolar: {
    type: Number,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

const DOLAR = model('DOLAR', DolarSchema)

export default DOLAR
