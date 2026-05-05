import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { usuario, logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="logo">🌿 FincaApp</div>
      <nav style={{ flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Panel
        </NavLink>
        <NavLink to="/actividades" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Actividades
        </NavLink>
      </nav>
      {usuario && (
        <div style={{ borderTop: '1px solid #2e3a2e', paddingTop: '1rem', marginTop: '1rem' }}>
          <div style={{ fontSize: '12px', color: '#6a7e6a', marginBottom: '8px', wordBreak: 'break-all' }}>
            {usuario.displayName}
          </div>
          <button
            onClick={logout}
            className="btn"
            style={{ width: '100%', background: '#2a1a1a', color: '#d47a7a', border: '1px solid #3a2a2a', fontSize: '13px' }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </aside>
  )
}

export default Navbar