import { configureStore } from '@reduxjs/toolkit';
import productReducer, {ProductsState} from '../features/HotPricesSlice';
interface Store {
  product: ProductsState,
}
export const store = configureStore<Store> ({
  reducer: {
    product: productReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
