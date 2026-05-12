/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        accent: '#38bdf8',
        dark: {
          900: '#0a0a0f',
          800: '#0f0f16',
          700: '#16161f',
          600: '#1e1e2a',
          500: '#2a2a3a',
        },
      },
    },
  },
  plugins: [],
}