import { Action } from 'redux';

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const setProduct = (product: Product | undefined) => (
  {
    type: ADD_PRODUCT,
    product,
  }
);

export const removeProduct = (productId: string | undefined) => (
  {
    type: REMOVE_PRODUCT,
    productId,
  }
);

type setProduct = Action<typeof ADD_PRODUCT> & {
  product: Product;
};

type removeProduct = Action<typeof REMOVE_PRODUCT> & {
  productId: string;
};

type AllowedActions = setProduct | removeProduct;

let initState: Product[] = [];

if (localStorage.getItem('favorites')) {
  initState = [...JSON.parse(localStorage.getItem('favorites') || '')];
}

export const reducerFavoriteProducts = (favoriteProducts = initState, action: AllowedActions) => {
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
