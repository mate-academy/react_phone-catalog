import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import favoritesReducer from '../features/favoritesSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
