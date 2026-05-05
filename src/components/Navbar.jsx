import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="logo">🌿 FincaApp</div>
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Panel
        </NavLink>
        <NavLink to="/actividades" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Actividades
        </NavLink>
      </nav>
    </aside>
  )
}

export default Navbar
