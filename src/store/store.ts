import { configureStore } from '@reduxjs/toolkit';
import phonesReducer from './slices/phonesSlice';
import favouritesReducer from './slices/favouritesSlice';
import productsReducer from './slices/productsSlice';
import cardsReducer from './slices/cardsSlice';
import tabletsReducer from './slices/tabletsSlice';
import accessoriesReducer from './slices/accessoriesSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    phone: phonesReducer,
    favourites: favouritesReducer,
    products: productsReducer,
    cards: cardsReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
