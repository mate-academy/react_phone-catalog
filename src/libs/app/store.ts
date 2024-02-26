import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import phonesReducer from '../slices/phonesSlice';
import tabletsReducer from '../slices/tabletsSlice';
import accessoriesReducer from '../slices/accessoriesSlice';
import productDetailsReducer from '../slices/productDetailsSlice';
import suggestedProductsReducer from '../slices/suggestedProductsSlice';
import cartReducer from '../slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    phones: phonesReducer,
    tablets: tabletsReducer,
    accessories: accessoriesReducer,
    productDetails: productDetailsReducer,
    suggestedProducts: suggestedProductsReducer,
    cartItems: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
