import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
