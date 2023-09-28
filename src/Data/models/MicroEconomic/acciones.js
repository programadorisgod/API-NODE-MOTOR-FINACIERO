import { Schema, model } from 'mongoose'

const AccionesSchema = new Schema({
  nemotecnico: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  percentage_change: { type: String, required: true },
  volumes: { type: String, required: true },
  last_price: { type: String, required: true },
  amount: { type: String, required: true },
  absolute_change: { type: String, required: true },
  open_price: { type: String, required: true },
  max_price: { type: String, required: true },
  min_price: { type: String, required: true },
  average_price: { type: String, required: true },
  date: { type: String, required: true }

}, {
  timestamps: false,
  versionKey: false
})

const Acciones = model('Acciones', AccionesSchema)

export default Acciones
