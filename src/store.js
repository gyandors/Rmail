import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';
import UiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: { authState: AuthReducer, uiState: UiReducer },
});
