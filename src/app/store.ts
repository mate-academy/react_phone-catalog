import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, {
  FavouriteState,
} from '../features/favouritesReducer';
import cartReducer, { CartState } from '../features/cartReducer';

export const store = configureStore({
  reducer: {
    favourite: favouritesReducer,
    cart: cartReducer,
  },
});

export type RootState = {
  favourite: FavouriteState;
  cart: CartState;
};

export type AppDispatch = typeof store.dispatch;

export default store;
