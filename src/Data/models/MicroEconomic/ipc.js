import { Schema, model } from 'mongoose'

const ipcSchema = new Schema({
  date: { type: String, required: true },
  indice: { type: Number, required: true },
  annual_inflation: { type: Number, required: true },
  monthly_inflation: { type: Number, required: true },
  annual_current_inflation: { type: Number, required: true }
}, {
  timestamps: false,
  versionKey: false
})
const Ipc = model('Ipc', ipcSchema)

export default Ipc
