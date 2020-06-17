import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
// import thunk from 'redux-thunk';
import { getProducts } from '../helpers/api';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_PRODUCTS = 'SET_PRODUCTS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const SET_QUERY = 'SET_QUERY';


export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });
export const setProducts = (products: Product[]) => ({ type: SET_PRODUCTS, products });
export const handleError = (errorMessage: string) => ({
  type: HANDLE_ERROR,
  errorMessage,
});

export const setQuery = (query: string) => (
  {
    type: SET_QUERY,
    query,
  }
);

export const getIsLoading = (state: RootState) => state.isLoading;
export const getQuery = (state: RootState) => state.query;
export const getError = (state: RootState) => state.errorMessage;

export const getPhones = (state: RootState) => state.products.filter(product => product.type === 'phone');

export const getVisibleProducts = (state: RootState) => {
  return state.products
    .filter((product: Product) => (
      (product.name + product.screen + product.capacity)
        .toLowerCase().includes(state.query.trim().toLowerCase())
    ));
};

export type RootState = {
  products: Product[];
  query: string;
  isLoading: boolean;
  errorMessage: string;
};

const initialState: RootState = {
  products: [],
  query: '',
  isLoading: false,
  errorMessage: '',
};

const rootReducer = (state = initialState, action: AnyAction): RootState => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case HANDLE_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };


    default: return state;
  }
};

export const loadProducts = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(startLoading());
    try {
      const productsFromServer = await getProducts();

      dispatch(setProducts(productsFromServer));
    } catch (error) {
      dispatch(handleError('Error '));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(rootReducer, composeWithDevTools());

export default store;
