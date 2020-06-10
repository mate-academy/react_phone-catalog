import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import productsReducer, { setProducts } from './products';
import { fetchProductDetails, fetchProducts } from '../common/helpers/api';
import favoritesReducer from './favorites';
import cartReducer from './cart';
import errorReducer, { setError } from './error';
import detailsReducer, { setDetails } from './details';
import loadingReducer, { setLoading } from './loading';


const rootReducer = combineReducers({
  products: productsReducer,
  favorites: favoritesReducer,
  details: detailsReducer,
  cart: cartReducer,
  loading: loadingReducer,
  error: errorReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getFavorites = (state: RootState) => state.favorites;
export const getDetails = (state: RootState) => state.details;
export const getCartItems = (state: RootState) => state.cart.cartItems;
export const getPrice = (state: RootState) => state.cart.price;
export const getLoading = (state: RootState) => state.loading;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));

    try {
      const products = await fetchProducts();

      dispatch(setProducts(products));
    } catch (error) {
      dispatch(setError('Error occurred when loading data'));
    }

    dispatch(setLoading(false));

  };
};

export const loadDetails = (productId: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setLoading(true));

    try {
      const details = await fetchProductDetails(productId);

      dispatch(setDetails(details));
    } catch (error) {
      dispatch(setError('Error occurred when loading data'));
    }

    dispatch(setLoading(false));
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
