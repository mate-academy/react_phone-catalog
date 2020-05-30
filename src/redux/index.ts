import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import productsReducer, { setProducts } from './products';
import { fetchProducts } from '../common/helpers/api';


const rootReducer = combineReducers({
  products: productsReducer,
});

export const getProducts = (state: RootState) => state.products;

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
