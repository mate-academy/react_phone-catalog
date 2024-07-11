import { configureStore, Reducer, EnhancedStore } from '@reduxjs/toolkit';
import productsReducer, { ProductsState } from '../features/products';
import basketReducer, { BasketState } from '../features/basket';
import favouriteReducer, { FavouriteState } from '../features/favourite';

export const store: EnhancedStore<{
  products: ProductsState;
  basket: BasketState;
  favourite: FavouriteState;
}> = configureStore({
  reducer: {
    products: productsReducer as Reducer<ProductsState>,
    basket: basketReducer as Reducer<BasketState>,
    favourite: favouriteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
