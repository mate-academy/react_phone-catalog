import { Product } from '../types/Product';

type AddAction = { type: 'addedToCartProducts/ADD'; payload: Product };
type DeleteAction = { type: 'addedToCartProducts/DELETE'; payload: string };

type Action = AddAction | DeleteAction;

const add = (product: Product): AddAction => ({
  type: 'addedToCartProducts/ADD',
  payload: product,
});
const deleteOne = (id: string): DeleteAction => ({
  type: 'addedToCartProducts/DELETE',
  payload: id,
});

/* eslint-disable @typescript-eslint/default-param-last */
const addedToCartProductsReducer = (
  addedToCartProducts: Product[] = [],
  action: Action,
) => {
  switch (action.type) {
    case 'addedToCartProducts/ADD':
      return [...addedToCartProducts, action.payload];

    case 'addedToCartProducts/DELETE':
      return addedToCartProducts.filter(
        product => product.itemId !== action.payload,
      );

    default:
      return addedToCartProducts;
  }
};

export const actions = { add, deleteOne };

export default addedToCartProductsReducer;
