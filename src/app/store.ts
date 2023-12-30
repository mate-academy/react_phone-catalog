import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';
import phonesReduser from '../features/phones';
import productSliceReducer from '../features/product';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    phones: phonesReduser,
    product: productSliceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
