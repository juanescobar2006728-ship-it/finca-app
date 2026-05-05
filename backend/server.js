import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import actividadesRouter from './routes/actividades.js'
import usuariosRouter from './routes/usuarios.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error:', err))

app.use('/api/actividades', actividadesRouter)
app.use('/api/usuarios', usuariosRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`))
