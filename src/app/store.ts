import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/productSlicer';
import cartReducer from '../features/cartSlicer';
import favouritesReducer from '../features/favouritesSlicer';
import productPriceReducer from '../features/productPriceSlicer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cartProducts: cartReducer,
    favourites: favouritesReducer,
    productPrice: productPriceReducer,
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
