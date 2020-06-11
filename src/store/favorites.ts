import { AnyAction } from 'redux';

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const setProduct = (product: Slide) => (
  {
    type: ADD_PRODUCT,
    product,
  }
);

export const removeProduct = (productId: string) => (
  {
    type: REMOVE_PRODUCT,
    productId,
  }
);

export const reducerFavoriteProducts = (favoriteProducts: Slide[] = [], action: AnyAction) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...favoriteProducts, action.product];
    case REMOVE_PRODUCT:
      return favoriteProducts
        .filter(product => product.id !== action.productId);

    default:
      return favoriteProducts;
  }
};
