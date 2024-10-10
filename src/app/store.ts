import favouritesReducer from '../features/favourites';
import cartReducer from '../features/cart';
import prodsReducer from '../features/prods';
import themeReducer from '../features/theme';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    cart: cartReducer,
    prods: prodsReducer,
    theme: themeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
