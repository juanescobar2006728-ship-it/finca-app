import { useState } from 'react'

const TIPOS = ['Alimentación', 'Cosecha', 'Riego', 'Mantenimiento', 'Gasto']

function FormActividad({ onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    titulo: '',
    tipo: 'Alimentación',
    responsable: '',
    descripcion: '',
    monto: 0,
    estado: 'Pendiente'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.titulo || !form.responsable) return
    onGuardar(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nueva actividad</h2>

        <div className="form-group">
          <label>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Ej: Alimentación ganado zona norte" />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            {TIPOS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Responsable</label>
          <input name="responsable" value={form.responsable} onChange={handleChange} placeholder="Nombre del responsable" />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Detalles opcionales..." />
        </div>

        <div className="form-group">
          <label>Monto (solo si es gasto)</label>
          <input type="number" name="monto" value={form.monto} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button className="btn" style={{ background: '#2a2a2a', color: '#8a9e8a' }} onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormActividad
