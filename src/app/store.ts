import { configureStore } from '@reduxjs/toolkit';
import productReducer, { ProductState } from '../features/ProductSlice';
interface Store {
  product: ProductState;
}
export const store = configureStore<Store>({
  reducer: {
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
