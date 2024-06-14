import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './features/products/productsSlice';
import { favouritesSlice } from './features/favourites/favouritesSlice';
import { cartSlice } from './features/cart/cartSlice';
import { preferencesSlice } from './features/preferences/preferencesSlice';
import { phonesSlice } from './features/detailedProduct/phones/phonesSlice';

export const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [favouritesSlice.name]: favouritesSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [preferencesSlice.name]: preferencesSlice.reducer,
    [phonesSlice.name]: phonesSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
