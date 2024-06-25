/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './features/products/productsSlice';
import { favouritesSlice } from './features/favourites/favouritesSlice';
import { cartSlice } from './features/cart/cartSlice';
import { preferencesSlice } from './features/preferences/preferencesSlice';
import { phonesSlice } from './features/detailedProduct/phones/phonesSlice';
import { tabletsSlice } from './features/detailedProduct/tablets/tabletsSlice';
import { accessoriesSlice } from './features/detailedProduct/accessories/accessoriesSlice';

export const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [favouritesSlice.name]: favouritesSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [preferencesSlice.name]: preferencesSlice.reducer,
    [phonesSlice.name]: phonesSlice.reducer,
    [tabletsSlice.name]: tabletsSlice.reducer,
    [accessoriesSlice.name]: accessoriesSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
