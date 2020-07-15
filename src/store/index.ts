import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import { getProductsList } from './../helpers/api';

import { productsReducer, loadSuccess } from './products';
import { errorReducer, loadError } from './errorMessage';

const rootReducer = combineReducers({
  products: productsReducer,
  errorMessage: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getProducts = (state: RootState) => state.products;
export const getErrorMessage = (state: RootState) => state.errorMessage;

export const loadProducts = () => {
  return async (dispatch: Dispatch<any>) => {
    return getProductsList()
      .then(products => dispatch(loadSuccess(products)))
      .catch(() => dispatch(loadError('Fail connected to server')));
  };
};

const initialState: RootState = {
  products: [],
  errorMessage: '',
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
