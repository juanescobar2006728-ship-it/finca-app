import { useEffect, useState } from 'react'

function App() {
  const [mensaje, setMensaje] = useState('Cargando...')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ping`)
      .then(res => res.json())
      .then(data => setMensaje(data.mensaje))
      .catch(() => setMensaje('❌ Error al conectar con el backend'))
  }, [])

  return (
    <div>
      <h1>Estado del backend:</h1>
      <p>{mensaje}</p>
    </div>
  )
}

export default App
