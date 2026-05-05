import express from 'express'
import Actividad from '../models/Actividad.js'

const router = express.Router()

// Obtener todas las actividades
router.get('/', async (req, res) => {
  try {
    const { tipo, fecha } = req.query
    let filtro = {}
    if (tipo) filtro.tipo = tipo
    if (fecha) filtro.fecha = { $gte: new Date(fecha) }
    const actividades = await Actividad.find(filtro).sort({ fecha: -1 })
    res.json(actividades)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Crear una actividad
router.post('/', async (req, res) => {
  try {
    const actividad = new Actividad(req.body)
    await actividad.save()
    res.status(201).json(actividad)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Actualizar una actividad
router.put('/:id', async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(actividad)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Eliminar una actividad
router.delete('/:id', async (req, res) => {
  try {
    await Actividad.findByIdAndDelete(req.params.id)
    res.json({ mensaje: 'Actividad eliminada' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
