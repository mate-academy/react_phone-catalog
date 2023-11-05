import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    cartItems: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
