import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useTheme } from '../../context/ThemeContext'

export default function Layout() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-dark-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}