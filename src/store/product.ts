import { AnyAction } from 'redux';

const SET_PRODUCT = 'SET_PRODUCT';


export const setProduct = (product: Products) => ({ type: SET_PRODUCT, product });


const reducer = (product: Product | {} = {}, action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;

    default:
      return product;
  }
};

export default reducer;
