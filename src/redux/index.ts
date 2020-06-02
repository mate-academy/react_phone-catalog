import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import productsReducer, { setProducts } from './products';
import { fetchProducts } from '../common/helpers/api';
import favoritesReducer from './favorites';


const rootReducer = combineReducers({
  products: productsReducer,
  favorites: favoritesReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getFavorites = (state: RootState) => state.favorites;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    const products = await fetchProducts();

    dispatch(setProducts(products));
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
