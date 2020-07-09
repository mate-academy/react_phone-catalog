import { Action } from 'redux';

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

type setProduct = Action<typeof ADD_PRODUCT> & {
  product: ProductItem;
};

type removeProduct = Action<typeof REMOVE_PRODUCT> & {
  productId: string;
};

export const setProduct = (product: ProductItem | undefined) => (
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

type AllowedAction = setProduct | removeProduct;

let initState: ProductItem[] = [];

if (localStorage.getItem('favorites')) {
  initState = [...JSON.parse(localStorage.getItem('favorites') || '')];
}

const favoriteReducer = (favoriteProducts = initState, action: AllowedAction) => {
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

export default favoriteReducer;
