import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import phonesReducer from './slices/phonesSlice';
import tabletsReducer from './slices/tabletsSlice';
import accessoriesReducer from './slices/accessoriesSlice';
import cartItemsReducer from './slices/cartItemsSlice';
import favoritesItemsReducer from './slices/favoritesItemsSlice';
import isMenuActiveReducer from './slices/isMenuActiveSlice';
import updatedAtReducer from './slices/updatedAtSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    cartItems: cartItemsReducer,
    favoritesItems: favoritesItemsReducer,
    isMenuActive: isMenuActiveReducer,
    updatedAt: updatedAtReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
