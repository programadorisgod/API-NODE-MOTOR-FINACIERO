import { Schema, model } from 'mongoose'

const tipSchema = new Schema({
  year_month_day: {
    type: String,
    required: true
  },
  tip: {
    type: Number,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

const Tip = model('Tip', tipSchema)

export default Tip
