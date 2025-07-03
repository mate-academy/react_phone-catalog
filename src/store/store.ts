import favoritesReducer from '../expansions/favorites';
import cartReducer from '../expansions/cart';
import prodsReducer from '../expansions/products';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cart: cartReducer,
    prods: prodsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
