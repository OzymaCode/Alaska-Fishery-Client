import { integerPropType } from '@mui/utils'
import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    shopGrid: false,
  },
  reducers: {
    toggle: (state, action) => {
      state.shopGrid = !state.shopGrid
    },
  },
})

export default settingsSlice.reducer

export const { toggle } = settingsSlice.actions
