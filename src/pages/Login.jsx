import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Login() {
  const { loginConGoogle, usuario } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (usuario) navigate('/')
  }, [usuario])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#1a1f1a'
    }}>
      <div style={{
        background: '#1e261e',
        border: '1px solid #2e3a2e',
        borderRadius: '12px',
        padding: '2.5rem',
        width: '360px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '1rem' }}>🌿</div>
        <h1 style={{ fontSize: '22px', color: '#c8e6c8', marginBottom: '0.5rem' }}>FincaApp</h1>
        <p style={{ fontSize: '14px', color: '#6a7e6a', marginBottom: '2rem' }}>
          Registro de actividades para tu granja
        </p>
        <button
          onClick={loginConGoogle}
          style={{
            width: '100%',
            padding: '10px',
            background: '#3a6b3a',
            color: '#a8d8a8',
            border: '1px solid #4a8b4a',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  )
}

export default Login
