import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import packagesReducer from './slices/packagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    packages: packagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
