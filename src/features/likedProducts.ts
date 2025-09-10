import { Product } from '../types/Product';

type AddAction = { type: 'likedProducts/ADD'; payload: Product };
type GetAllAction = { type: 'likedProducts/GETALL' };
type DeleteAction = { type: 'likedProducts/DELETE'; payload: string };

type Action = AddAction | GetAllAction | DeleteAction;

const add = (product: Product): AddAction => ({
  type: 'likedProducts/ADD',
  payload: product,
});
const getAll = (): GetAllAction => ({ type: 'likedProducts/GETALL' });
const deleteOne = (id: string): DeleteAction => ({
  type: 'likedProducts/DELETE',
  payload: id,
});

/* eslint-disable @typescript-eslint/default-param-last */
const likedProductsReducer = (
  likedProducts: Product[] = [],
  action: Action,
) => {
  switch (action.type) {
    case 'likedProducts/ADD':
      return [...likedProducts, action.payload];

    case 'likedProducts/GETALL':
      return likedProducts;

    case 'likedProducts/DELETE':
      return likedProducts.filter(product => product.itemId !== action.payload);

    default:
      return likedProducts;
  }
};

export const actions = { add, getAll, deleteOne };

export default likedProductsReducer;
