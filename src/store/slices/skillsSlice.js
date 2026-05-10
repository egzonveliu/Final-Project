import { createSlice } from '@reduxjs/toolkit'

const initialSkills = [
  { id: 1, name: 'React.js', category: 'Framework', level: 75 },
  { id: 2, name: 'Tailwind CSS', category: 'Styling', level: 80 },
  { id: 3, name: 'REST APIs', category: 'Backend', level: 65 },
  { id: 4, name: 'Git', category: 'Tools', level: 70 },
  { id: 5, name: 'HTML5', category: 'Core', level: 90 },
  { id: 6, name: 'CSS3', category: 'Core', level: 85 },
  { id: 7, name: 'JavaScript ES6+', category: 'Core', level: 78 },
  { id: 8, name: 'Responsive Design', category: 'Styling', level: 82 },
]

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    items: initialSkills,
    nextId: 9,
  },
  reducers: {
    addSkill: (state, action) => {
      state.items.push({ ...action.payload, id: state.nextId++ })
    },
    updateSkill: (state, action) => {
      const idx = state.items.findIndex(s => s.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    deleteSkill: (state, action) => {
      state.items = state.items.filter(s => s.id !== action.payload)
    },
  },
})

export const { addSkill, updateSkill, deleteSkill } = skillsSlice.actions
export default skillsSlice.reducer
