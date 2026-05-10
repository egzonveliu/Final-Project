import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    modalOpen: false,
    modalType: null,
    editingItem: null,
  },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    openModal: (state, action) => {
      state.modalOpen = true
      state.modalType = action.payload.type
      state.editingItem = action.payload.item || null
    },
    closeModal: (state) => {
      state.modalOpen = false
      state.modalType = null
      state.editingItem = null
    },
  },
})

export const { toggleSidebar, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
