import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';
import paginationReducer from './reducers/paginationReducer';
import searchReducer from './reducers/searchReducer';
import favouritesReducer from './reducers/favouritesReducer';
import sortReducer from './reducers/sortReducer';
import cartReducer from './reducers/cartReducer';
import modalWindowReducer from './reducers/modalWindowReducer';
import checkoutReducer from './reducers/checkoutReducer';
import productDetailsReducer from './reducers/productDetailsReducer';
import modifiedProductsReducer from './reducers/modifiedProductsReducer';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    pagination: paginationReducer,
    search: searchReducer,
    favourites: favouritesReducer,
    sort: sortReducer,
    cart: cartReducer,
    modal: modalWindowReducer,
    checkout: checkoutReducer,
    productDetails: productDetailsReducer,
    modifiedProducts: modifiedProductsReducer,
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
