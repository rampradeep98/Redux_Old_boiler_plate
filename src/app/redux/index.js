import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import layoutSlice from './layoutSlice';
import roleSlice from './roleSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    layout: layoutSlice,
    role: roleSlice,
  },
});
