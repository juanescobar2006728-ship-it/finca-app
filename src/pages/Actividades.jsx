import { useState } from 'react'
import { useActividades } from '../hooks/useActividades'
import FormActividad from '../components/FormActividad'

const TIPOS = ['Todos', 'Alimentación', 'Cosecha', 'Riego', 'Mantenimiento', 'Gasto']

function Actividades() {
  const [filtroTipo, setFiltroTipo] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const { actividades, cargando, crear, actualizar, eliminar } = useActividades({ tipo: filtroTipo })

  const handleFiltro = (tipo) => {
    setFiltroTipo(tipo === 'Todos' ? '' : tipo)
  }

  const handleCrear = async (datos) => {
    await crear(datos)
    setMostrarForm(false)
  }

  const toggleEstado = async (actividad) => {
    await actualizar(actividad._id, {
      estado: actividad.estado === 'Hecho' ? 'Pendiente' : 'Hecho'
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ margin: 0 }}>Actividades</h1>
        <button className="btn btn-primary" onClick={() => setMostrarForm(true)}>
          + Nueva actividad
        </button>
      </div>

      <div className="filters">
        {TIPOS.map(tipo => (
          <div
            key={tipo}
            className={`filter-chip ${(filtroTipo === '' && tipo === 'Todos') || filtroTipo === tipo ? 'active' : ''}`}
            onClick={() => handleFiltro(tipo)}
          >
            {tipo}
          </div>
        ))}
      </div>

      <div className="tabla">
        <div className="tabla-header">
          <span>Actividad</span>
          <span>Fecha</span>
          <span>Responsable</span>
          <span>Tipo</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {cargando ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6a7e6a' }}>Cargando...</div>
        ) : actividades.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6a7e6a' }}>No hay actividades registradas</div>
        ) : (
          actividades.map(a => (
            <div className="tabla-row" key={a._id}>
              <span style={{ color: '#c8e6c8' }}>{a.titulo}</span>
              <span>{new Date(a.fecha).toLocaleDateString('es-MX')}</span>
              <span>{a.responsable}</span>
              <span><span className={`badge badge-${a.tipo}`}>{a.tipo}</span></span>
              <span>
                <span
                  className={`badge badge-${a.estado}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleEstado(a)}
                >
                  {a.estado}
                </span>
              </span>
              <span>
                <button className="btn btn-danger" style={{ padding: '3px 8px', fontSize: '12px' }} onClick={() => eliminar(a._id)}>
                  Eliminar
                </button>
              </span>
            </div>
          ))
        )}
      </div>

      {mostrarForm && (
        <FormActividad
          onGuardar={handleCrear}
          onCerrar={() => setMostrarForm(false)}
        />
      )}
    </div>
  )
}

export default Actividades
