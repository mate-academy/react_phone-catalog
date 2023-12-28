import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../Components/features/ProductsSlicer';
import favouritesReducer from '../Components/features/FavouritesSlicer';
import cartProductsReducer from '../Components/features/CartSlicer';
import productPriceReducer from '../Components/features/ProductPrice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favourites: favouritesReducer,
    cartProducts: cartProductsReducer,
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
