import { configureStore } from '@reduxjs/toolkit'
import baseApi from './feature/api/baseApi'
import userSlice from './feature/users/userSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
    user : userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch