import { configureStore } from '@reduxjs/toolkit';
import currentThemeReducer from '../features/currentTheme';
import productsReducer from '../features/products';
import favouritesReducer from '../features/favourites';

export const store = configureStore({
  reducer: {
    currentTheme: currentThemeReducer,
    products: productsReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
