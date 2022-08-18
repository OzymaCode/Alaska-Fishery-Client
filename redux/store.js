import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartReducer'
import settingsReducer from './reducers/settingsReducer'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    settings: settingsReducer,
  },
})

export default store
