import { AnyAction } from 'redux';
import { Product } from '../interfaces';

const SET_PHONES = 'SET_PHONES';

export const setProducts = (products: Product[]) => ({ type: SET_PHONES, payload: products });

const reducer = (products = [], action: AnyAction) => {
  switch (action.type) {
    case SET_PHONES:

      return action.payload;

    default:
      return products;
  }
};

export default reducer;
