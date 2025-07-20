import { configureStore } from '@reduxjs/toolkit';
import { reducer as cartReducer } from '../redux/cart';
import { reducer as favouritesReducer } from '../redux/favourites';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
  },
});
