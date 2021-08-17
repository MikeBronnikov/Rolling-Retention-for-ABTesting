import { configureStore } from "@reduxjs/toolkit"
import dataR from './dataSlice'

export const store = configureStore({
    reducer: {
        dataReducer: dataR
      },
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch