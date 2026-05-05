import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  nombre: { type: String },
  email: { type: String },
  foto: { type: String },
  creadoEn: { type: Date, default: Date.now }
})

export default mongoose.model('Usuario', usuarioSchema)
