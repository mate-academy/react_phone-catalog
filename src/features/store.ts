import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './products/productsSlice';
import { phonesSlice } from './phones/phonesSlice';
import { currentDeviceSlice } from './currentDevice/currentDeviceSlice';
import { tabletsSlice } from './tablets/tabletsSlice';
import { accessoriesSlice } from './accessories/accessories';
import { favouritesSlice } from './favourites/favouritesSlice';
import { cartSlice } from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    phones: phonesSlice.reducer,
    device: currentDeviceSlice.reducer,
    tablets: tabletsSlice.reducer,
    accessories: accessoriesSlice.reducer,
    favourites: favouritesSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
