import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const DEMO_USERS = [
  { id: 1, email: 'egzon@demo.com', password: 'demo123', name: 'Egzon Veliu', role: 'admin' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    await new Promise(r => setTimeout(r, 600))
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Email ose fjalëkalimi është i gabuar.')
    const { password: _, ...safeUser } = found
    localStorage.setItem('portfolio_user', JSON.stringify(safeUser))
    setUser(safeUser)
    return safeUser
  }, [])

  const register = useCallback(async ({ name, email, password }) => {
    await new Promise(r => setTimeout(r, 600))
    if (DEMO_USERS.find(u => u.email === email)) throw new Error('Ky email ekziston tashmë.')
    const newUser = { id: Date.now(), name, email, role: 'user' }
    localStorage.setItem('portfolio_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('portfolio_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
