import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import productsReducer, { setProducts } from './products';
import { fetchProductDetails, fetchProducts } from '../common/helpers/api';
import favoritesReducer from './favorites';
import detailsReducer, { setDetails } from './details';
import cartReducer from './cart';
import errorReducer, { setError } from './error';


const rootReducer = combineReducers({
  products: productsReducer,
  details: detailsReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
  error: errorReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getDetails = (state: RootState) => state.details;
export const getFavorites = (state: RootState) => state.favorites;
export const getCartItems = (state: RootState) => state.cart.cartItems;
export const getPrice = (state: RootState) => state.cart.price;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const products = await fetchProducts();

      dispatch(setProducts(products));
      dispatch(setError(''));
    } catch (error) {
      dispatch(setError('Error occurred when loading data'));
    }
  };
};

export const loadDetails = (productId: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const details = await fetchProductDetails(productId);

      dispatch(setDetails(details));
      dispatch(setError(''));
    } catch (error) {
      dispatch(setError('Error occurred when loading data'));
    }
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
