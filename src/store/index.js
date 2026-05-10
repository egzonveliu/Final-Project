import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './slices/projectsSlice'
import skillsReducer from './slices/skillsSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    skills: skillsReducer,
    ui: uiReducer,
  },
})
