import { Link } from 'react-router-dom'
import { Github, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/[0.06] mt-auto bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-mono text-sm text-accent">EV.dev</span>
          <p className="text-xs text-gray-400 dark:text-white/30 mt-1 font-mono tracking-wide">© 2025 Egzon Veliu. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="mailto:egzonn14@gmail.com" className="text-gray-400 dark:text-white/40 hover:text-accent transition-colors" aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="https://github.com/egzonveliu" target="_blank" rel="noreferrer" className="text-gray-400 dark:text-white/40 hover:text-accent transition-colors" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="tel:+38349578345" className="text-gray-400 dark:text-white/40 hover:text-accent transition-colors" aria-label="Phone">
            <Phone size={16} />
          </a>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
          Available for work
        </div>
      </div>
    </footer>
  )
}