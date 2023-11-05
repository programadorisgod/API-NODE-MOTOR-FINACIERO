import { Schema, model } from 'mongoose'

const metalesSchema = new Schema({
  date: { type: String, required: true },
  gold: {
    purchase_price: { type: Number, required: true },
    sales_price: { type: Number, required: true }
  },
  silver: {
    purchase_price: { type: Number, required: true },
    sales_price: { type: Number, required: true }
  },
  platinum: {
    purchase_price: { type: Number, required: true },
    sales_price: { type: Number, required: true }
  }

}, {
  timestamps: false,
  versionKey: false
})

const Metals = model('Metal', metalesSchema)

export default Metals
