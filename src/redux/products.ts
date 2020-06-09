import { Action } from 'redux';

const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = (products: Product[]) => ({ type: SET_PRODUCTS, products });

type setProductsAction = Action<typeof SET_PRODUCTS> & {
  products: Product[];
};

type AllowedActions = setProductsAction;

const productsReducer = (products = [], action: AllowedActions) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;

    default:
      return products;
  }
};

export default productsReducer;
