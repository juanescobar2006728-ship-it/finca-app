import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await axios.post('/api/usuarios', {
          uid: user.uid,
          nombre: user.displayName,
          email: user.email,
          foto: user.photoURL
        })
        setUsuario(user)
      } else {
        setUsuario(null)
      }
      setCargando(false)
    })
    return unsub
  }, [])

  const loginConGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, loginConGoogle, logout }}>
      {!cargando && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}