import {
  Action,
  ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import selectedProductReducer from '../features/selectedProductSlice';
import favoriteAndCartReducer from '../features/favoriteAndCartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    selectedProduct: selectedProductReducer,
    favoriteAndCartProducts: favoriteAndCartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
