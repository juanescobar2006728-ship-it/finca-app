import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Actividades from './pages/Actividades'
import Login from './pages/Login'

function RutaProtegida({ children }) {
  const { usuario } = useAuth()
  return usuario ? children : <Navigate to="/login" />
}

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<RutaProtegida><Dashboard /></RutaProtegida>} />
          <Route path="/actividades" element={<RutaProtegida><Actividades /></RutaProtegida>} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </AuthProvider>
  )
}

export default App