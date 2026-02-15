import { configureStore } from '@reduxjs/toolkit';
import { menuModeSlice } from '../features/menuMode';
import { productsSlice } from '../features/products';
import { phonesSlice } from '../features/phones';
import { tabletsSlice } from '../features/tablets';
import { accessoriesSlice } from '../features/accessories';
import { suggestedProductsSlice } from '../features/suggestedProducts';
import { cartProductsSlice } from '../features/cartProducts';
import { favouritesSlice } from '../features/favourites';

export const store = configureStore({
  reducer: {
    menuMode: menuModeSlice.reducer,
    products: productsSlice.reducer,
    phones: phonesSlice.reducer,
    tablets: tabletsSlice.reducer,
    accessories: accessoriesSlice.reducer,
    suggestedProducts: suggestedProductsSlice.reducer,
    cartProducts: cartProductsSlice.reducer,
    favourites: favouritesSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem('cart', JSON.stringify(state.cartProducts));
  localStorage.setItem('favourites', JSON.stringify(state.favourites));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreKey = keyof RootState;
