import { configureStore } from '@reduxjs/toolkit';

import menuReducer from '@features/menuSlice';
import productsReducer, {
  NAME as PRODUCTS_NAME,
} from '@features/productsSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

let prevProducts = store.getState().products.products;

store.subscribe(() => {
  const currentState: RootState = store.getState();

  if (prevProducts !== currentState.products.products) {
    prevProducts = currentState.products.products;
    localStorage.setItem(PRODUCTS_NAME, JSON.stringify(prevProducts));
  }
});
