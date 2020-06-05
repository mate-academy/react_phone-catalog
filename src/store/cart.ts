
import { Product } from '../interfaces';
import { AnyAction } from 'redux';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART';
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (product: Product) => ({
  type: ADD_TO_CART,
  product
})
export const removeOneFromCart = (product: Product) => ({
  type: REMOVE_ONE_FROM_CART,
  product
})
export const removeAllFromCart = (product: Product) => ({
  type: REMOVE_ALL_FROM_CART,
  product
})
export const clearCart = () => ({
  type: CLEAR_CART
})

export const cartReducer = (state:Product[] = [], action: AnyAction) => {
  switch (action.type) {
    case ADD_TO_CART:
      return ([
        ...state,
        action.product,
      ]);
    case REMOVE_ALL_FROM_CART:
      return (
        state.filter((item: Product) => item.id !== action.product.id)
      );
    case REMOVE_ONE_FROM_CART:
      const id = state.findIndex(item => item.id === action.product.id)
      return ([
        ...state.slice(0, id),
        ...state.slice(id + 1)
      ]);
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}

