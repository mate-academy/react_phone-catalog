import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import productsReducer, { setProducts } from './products';
import { fetchProductDetails, fetchProducts } from '../common/helpers/api';
import favoritesReducer from './favorites';
import detailsReducer, { setDetails } from './details';
import cartReducer from './cart';


const rootReducer = combineReducers({
  products: productsReducer,
  details: detailsReducer,
  favorites: favoritesReducer,
  cartState: cartReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getDetails = (state: RootState) => state.details;
export const getFavorites = (state: RootState) => state.favorites;
export const getCart = (state: RootState) => state.cartState.cart;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    const products = await fetchProducts();

    dispatch(setProducts(products));
  };
};

export const loadDetails = (productId: string) => {
  return async (dispatch: Dispatch<any>) => {
    const details = await fetchProductDetails(productId);

    dispatch(setDetails(details));
  };
};

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '')
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
