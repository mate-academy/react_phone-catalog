import { Action } from 'redux';

const LOAD_SUCCESS = 'LOAD_SUCCESS';

type LoadSuccess = Action<typeof LOAD_SUCCESS> & { products: ProductInfo[] };

export const loadSuccess = (products: ProductInfo[]): LoadSuccess => ({
  type: LOAD_SUCCESS,
  products,
});

export const productsReducer = (products = [] as ProductInfo[], action: LoadSuccess) => {
  switch(action.type) {
    case LOAD_SUCCESS:
      return action.products;

    default:
      return products;
  }
};
