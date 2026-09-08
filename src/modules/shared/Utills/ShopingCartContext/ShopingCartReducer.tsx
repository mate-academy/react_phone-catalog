import { ProductInfo } from '../types';
import { ProductInCart } from './ShopingCartContext';

export type CartActions =
  | { type: 'TOGGLE_PRODUCT'; payload: ProductInfo }
  | { type: 'INCREMENT'; payload: string }
  | { type: 'DECREMENT'; payload: string }
  | { type: 'REMOVE'; payload: ProductInCart }
  | { type: 'REMOVE_ALL' };

export const ShopingCartReducer = (
  state: ProductInCart[],
  action: CartActions,
): ProductInCart[] => {
  switch (action.type) {
    case 'TOGGLE_PRODUCT': {
      return [
        ...state,
        {
          id: action.payload.itemId,
          product: action.payload,
          quantity: 1,
        },
      ];
    }

    case 'REMOVE': {
      return state.filter(elem => elem.id !== action.payload.id);
    }

    case 'DECREMENT': {
      return state
        .map(elem =>
          elem.id === action.payload
            ? { ...elem, quantity: elem.quantity - 1 }
            : elem,
        )
        .filter(elem => elem.quantity > 0);
    }

    case 'INCREMENT': {
      return state.map(elem =>
        elem.id === action.payload
          ? { ...elem, quantity: elem.quantity + 1 }
          : elem,
      );
    }

    case 'REMOVE_ALL': {
      return [];
    }

    default: {
      return state;
    }
  }
};
