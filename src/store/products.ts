import { AnyAction } from 'redux';

const SET_PRODUCTS = 'SET_PRODUCTS';


export const setProducts = (products: Products[]) => ({ type: SET_PRODUCTS, products });


const reducer = (products = [], action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;

    default:
      return products;
  }
};

export default reducer;
