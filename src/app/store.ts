import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import productsAllReducer from '../features/productsAll';
import filterReducer from '../features/filter';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';
import paginationReducer from '../features/pagination';
import phonesReducer from '../features/phones';
import tabletsReducer from '../features/tablets';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productsAll: productsAllReducer,
    filter: filterReducer,
    pagination: paginationReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    phones: phonesReducer,
    tablets: tabletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
