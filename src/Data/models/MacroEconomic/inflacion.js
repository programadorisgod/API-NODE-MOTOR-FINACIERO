import { Schema, model } from 'mongoose'

const inflacionSchema = new Schema({
  year_month: {
    type: String,
    required: true
  },
  inflation: {
    type: Number,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

const Inflation = model('Inflation', inflacionSchema)

export default Inflation
