import { HashRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { store } from './store'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

import Layout from './components/layout/Layout'
import PrivateRoute from './components/auth/PrivateRoute'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 1000 * 60 * 5 } },
})

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <HashRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={
                    <PrivateRoute><Dashboard /></PrivateRoute>
                  } />
                </Route>
              </Routes>
            </HashRouter>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: { background: '#0f0f16', color: '#e8e4dc', border: '0.5px solid rgba(255,255,255,0.1)', fontSize: '13px', fontFamily: 'DM Mono' },
                success: { iconTheme: { primary: '#7cffa4', secondary: '#0f0f16' } },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
