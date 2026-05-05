import { useActividades } from '../hooks/useActividades'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { actividades, cargando } = useActividades()
  const navigate = useNavigate()

  const total = actividades.length
  const pendientes = actividades.filter(a => a.estado === 'Pendiente').length
  const gastos = actividades.filter(a => a.tipo === 'Gasto').reduce((sum, a) => sum + a.monto, 0)
  const cosechas = actividades.filter(a => a.tipo === 'Cosecha').length

  const recientes = actividades.slice(0, 5)

  return (
    <div>
      <h1 className="page-title">Panel general</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total actividades</div>
          <div className="stat-val">{total}</div>
          <div className="stat-sub">registradas</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pendientes</div>
          <div className="stat-val">{pendientes}</div>
          <div className="stat-sub">por completar</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gastos</div>
          <div className="stat-val">${gastos.toLocaleString('es-MX')}</div>
          <div className="stat-sub">total registrado</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '16px', color: '#a8d8a8' }}>Actividades recientes</h2>
        <button className="btn btn-primary" onClick={() => navigate('/actividades')}>
          Ver todas
        </button>
      </div>

      <div className="tabla">
        <div className="tabla-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <span>Actividad</span>
          <span>Responsable</span>
          <span>Tipo</span>
          <span>Estado</span>
        </div>
        {cargando ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6a7e6a' }}>Cargando...</div>
        ) : recientes.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6a7e6a' }}>No hay actividades aún</div>
        ) : (
          recientes.map(a => (
            <div className="tabla-row" key={a._id} style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
              <span style={{ color: '#c8e6c8' }}>{a.titulo}</span>
              <span>{a.responsable}</span>
              <span><span className={`badge badge-${a.tipo}`}>{a.tipo}</span></span>
              <span><span className={`badge badge-${a.estado}`}>{a.estado}</span></span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
