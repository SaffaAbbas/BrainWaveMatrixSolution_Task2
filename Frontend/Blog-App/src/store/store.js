import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Integartion/userSlice.js"

export const store = configureStore({
  reducer: {
    user : userReducer
  },
})