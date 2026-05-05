import { useState, useEffect } from 'react'
import axios from 'axios'

const API = '/api/actividades'

export function useActividades(filtros = {}) {
  const [actividades, setActividades] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargar = async () => {
    setCargando(true)
    const res = await axios.get(API, { params: filtros })
    setActividades(res.data)
    setCargando(false)
  }

  useEffect(() => { cargar() }, [filtros.tipo, filtros.fecha])

  const crear = async (datos) => {
    const res = await axios.post(API, datos)
    setActividades(prev => [res.data, ...prev])
  }

  const actualizar = async (id, datos) => {
    const res = await axios.put(`${API}/${id}`, datos)
    setActividades(prev => prev.map(a => a._id === id ? res.data : a))
  }

  const eliminar = async (id) => {
    await axios.delete(`${API}/${id}`)
    setActividades(prev => prev.filter(a => a._id !== id))
  }

  return { actividades, cargando, crear, actualizar, eliminar, cargar }
}
