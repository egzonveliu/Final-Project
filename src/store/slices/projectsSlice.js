import { createSlice } from '@reduxjs/toolkit'

const initialProjects = [
  {
    id: 1,
    title: 'Responsive Web Application',
    description: 'A fully responsive multi-page web app built with React and Tailwind CSS. Implements component-based architecture, dynamic content rendering, and REST API integration.',
    tech: ['React.js', 'Tailwind CSS', 'REST API'],
    skillIds: [1, 2, 3],
    link: 'https://github.com/egzonveliu',
    featured: true,
    createdAt: '2025-01-15',
    category: 'Web',
  },
  {
    id: 2,
    title: 'Component Library UI',
    description: 'A reusable React component library with consistent styling using Tailwind CSS utility classes and clean design principles.',
    tech: ['React.js', 'Tailwind CSS', 'Git'],
    skillIds: [1, 2, 4],
    link: 'https://github.com/egzonveliu',
    featured: false,
    createdAt: '2025-02-10',
    category: 'Web',
  },
  {
    id: 3,
    title: 'Landing Page with JS',
    description: 'Modern landing page using vanilla JavaScript ES6+, CSS3 animations, and semantic HTML5 with a mobile-first approach.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    skillIds: [5, 6, 7],
    link: 'https://github.com/egzonveliu',
    featured: false,
    createdAt: '2024-12-05',
    category: 'Web',
  },
]

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: initialProjects,
    nextId: 4,
    filter: 'All',
    search: '',
    currentPage: 1,
    perPage: 4,
  },
  reducers: {
    addProject: (state, action) => {
      state.items.push({ ...action.payload, id: state.nextId++ })
    },
    updateProject: (state, action) => {
      const idx = state.items.findIndex(p => p.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
    setFilter: (state, action) => {
      state.filter = action.payload
      state.currentPage = 1
    },
    setSearch: (state, action) => {
      state.search = action.payload
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

export const { addProject, updateProject, deleteProject, setFilter, setSearch, setPage } = projectsSlice.actions
export default projectsSlice.reducer
