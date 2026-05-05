import express from 'express'
import Usuario from '../models/Usuario.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { uid, nombre, email, foto } = req.body
    const existe = await Usuario.findOne({ uid })
    if (existe) return res.json(existe)
    const nuevo = new Usuario({ uid, nombre, email, foto })
    await nuevo.save()
    res.status(201).json(nuevo)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
