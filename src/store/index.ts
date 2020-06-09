import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import productsReducer, { setProducts } from './products';
import { getAllProducts } from '../helpers/api';
import paginationReducer from './pagination';
import sortReducer from './sort';
import loadingReducer, { startLoading, finishLoading } from './loading';
import queryReducer from './query';

export const getPage = (state: RootState) => state.pagination.page;
export const getPerPage = (state: RootState) => state.pagination.perPage;
export const getSortField = (state: RootState) => state.sort;
export const getLoading = (state: RootState) => state.loading;
export const getQuery = (state: RootState) => state.query;
export const getQuantity = (
  state: RootState,
  type: string,
) => state.products.filter((product: Products) => product.name.toLowerCase().includes(state.query.toLowerCase()))
  .filter((product: Products) => product.type === type).length;


export const getProducts = (state: RootState) => state.products;

const rootReducer = combineReducers({
  products: productsReducer,
  pagination: paginationReducer,
  sort: sortReducer,
  loading: loadingReducer,
  query: queryReducer,
});


export type RootState = ReturnType<typeof rootReducer>;


export const getVisibleProducts = (state: RootState, type: string) => {
  let compare: (a: Products, b: Products) => number = () => 0;

  switch (state.sort.field) {
    case 'name':
      compare = (a: Products, b: Products) => a.name.localeCompare(b.name);
      break;
    case 'age':
    case 'price':
      compare = (a: any, b: any) => a[state.sort.field] - b[state.sort.field];
      break;
    default:
      break;
  }

  const visibleProducts = state.products
    .filter((product: Products) => product.type === type)
    .filter((product: Products) => product.name.toLowerCase().includes(state.query.toLowerCase()))
    .sort(compare);

  const { page, perPage } = state.pagination;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  return visibleProducts.slice(start, end);
};

export const loadData = () => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      const productsFromServer = await getAllProducts();

      dispatch(startLoading());
      dispatch(finishLoading());

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
