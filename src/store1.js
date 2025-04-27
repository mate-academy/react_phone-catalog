import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './redux/languageSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});
