import { CartProduct, Product } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';

const ADD_PRODUCT = 'ADD_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CHANGE_COUNT = 'CHANGE_COUNT';
const CLEAR_CART = 'CLEAR_CART';

type AddProduct = {
  type: typeof ADD_PRODUCT;
  payload: CartProduct;
};

type DeleteProduct = {
  type: typeof DELETE_PRODUCT;
  payload: string;
};

type ChangeCount = {
  type: typeof CHANGE_COUNT;
  payload: {
    id: string;
    delta: number;
  };
};

type ClearCart = {
  type: typeof CLEAR_CART;
};

export type CartAction = AddProduct | DeleteProduct | ChangeCount | ClearCart;

export const cartReducer = (state: CartProduct[], action: CartAction) => {
  switch (action.type) {
    case ADD_PRODUCT:
      if (state.some(item => item.product.id === action.payload.product.id)) {
        return state.filter(
          item => item.product.id !== action.payload.product.id,
        );
      }

      return [...state, action.payload];
    case DELETE_PRODUCT:
      return state.filter(item => item.id !== action.payload);
    case CHANGE_COUNT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + action.payload.delta,
          };
        }

        return item;
      });
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export const addProductToCart = (product: Product): AddProduct => ({
  type: ADD_PRODUCT,
  payload: {
    id: uuidv4(),
    quantity: 1,
    product: product,
  },
});

export const deleteProductFromCart = (id: string): DeleteProduct => ({
  type: DELETE_PRODUCT,
  payload: id,
});

export const changeProductQuantity = (
  id: string,
  delta: number,
): ChangeCount => ({
  type: CHANGE_COUNT,
  payload: {
    id,
    delta,
  },
});

export const clearCart = (): ClearCart => ({
  type: CLEAR_CART,
});
