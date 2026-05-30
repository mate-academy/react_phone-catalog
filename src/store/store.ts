import favoritesReducer from '../expansions/favorites';
import cartReducer from '../expansions/cart';
import productsReducer from '../expansions/products';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
