import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import productsReducer, { setProducts } from './products';
import { getAllProducts } from '../helpers/api';

const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = {
  products: Products[];
};

export const loadData = () => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      const productsFromServer = await getAllProducts();

      dispatch(setProducts(productsFromServer));
    } catch (error) {
      // do something to catch error
    }
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
