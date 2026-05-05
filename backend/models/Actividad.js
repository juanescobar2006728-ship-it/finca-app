import mongoose from 'mongoose'

const actividadSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Alimentación', 'Cosecha', 'Riego', 'Mantenimiento', 'Gasto'],
    required: true
  },
  responsable: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  monto: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Hecho'],
    default: 'Pendiente'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Actividad', actividadSchema)
