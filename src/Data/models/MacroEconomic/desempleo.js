import { Schema, model } from 'mongoose'

const desempleoSchema = new Schema({
  year_month: {
    type: String,
    required: true
  },
  unemployment: {
    type: Number,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
})

const Unemployment = model('Unemployment', desempleoSchema)

export default Unemployment
