import { Schema, model } from 'mongoose'

const AccionesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    last: {
      type: String,
      required: true
    },
    max: {
      type: String,
      required: true
    },
    vari: {
      type: String,
      required: true
    },
    percentVar: {
      type: String,
      required: true
    },
    vol: {
      type: String,
      required: true
    },
    hour: {
      type: String,
      required: true
    }
  }

}, {
  timestamps: false,
  versionKey: false
})

const Acciones = model('Acciones', AccionesSchema)

export default Acciones
