import { Action } from 'redux';

const ADD_GOOD = 'ADD_GOOD';
const DELETE_GOOD = 'DELETE_GOOD';

export const setProduct = (product: Good | undefined) => (
  {
    type: ADD_GOOD,
    product,
  }
);

export const removeProduct = (productId: string | undefined) => (
  {
    type: DELETE_GOOD,
    productId,
  }
);

type setProduct = Action<typeof ADD_GOOD> & {
  product: Good;
};

type removeProduct = Action<typeof DELETE_GOOD> & {
  productId: string;
};

type AllowedActions = setProduct | removeProduct;

let initState: Good[] = [];

if (localStorage.getItem('favorites')) {
  initState = [...JSON.parse(localStorage.getItem('favorites') || '')];
}

const favoritesReducer = (favoriteProducts = initState, action: AllowedActions) => {
  switch (action.type) {
    case ADD_GOOD:
      return [...favoriteProducts, action.product];
    case DELETE_GOOD:
      return favoriteProducts
        .filter(product => product.id !== action.productId);

    default:
      return favoriteProducts;
  }
};

export default favoritesReducer;
