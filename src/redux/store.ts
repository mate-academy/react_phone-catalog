import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import phonesReducer from './features/phonesSlice';
import tabletsReducer from './features/tabletsSlice';
import accessoriesReducer from './features/accessoriesSlice';
import cartReducer from './features/cartSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
