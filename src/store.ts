import { configureStore } from '@reduxjs/toolkit';

import sliderSlice from './features/slider/sliderSlice';
import sideBarSlice from './features/sideBar/sideBarSlice';
import favoriteSlice from './features/favorites/favoriteSlice';
import cartSlice from './features/cart/cartSlice';
import dropdownSlice from './features/dropdown/dropdownSlice';
import scrollSlice from './features/scroll/scrollSlice';

export const store = configureStore({
  reducer: {
    slider: sliderSlice,
    menu: sideBarSlice,
    favorites: favoriteSlice,
    cart: cartSlice,
    dropdown: dropdownSlice,
    scroll: scrollSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
