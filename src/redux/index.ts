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

export const getProducts = (state: RootState) => state.products;
export const getFavorites = (state: RootState) => state.favorites;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    const products = await fetchProducts();

    dispatch(setProducts(products));
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
