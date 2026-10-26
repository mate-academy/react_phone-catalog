import { CartProduct, Product } from 'src/types/Types';

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartProduct[], action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_FROM_CART': {
      return state.filter(el => el.name !== action.payload);
    }

    case 'INCREASE_QUANTITY': {
      return state.map(el =>
        el.name !== action.payload ? el : { ...el, quantity: el.quantity + 1 },
      );
    }

    case 'DECREASE_QUANTITY': {
      return state.map(el =>
        el.name !== action.payload ? el : { ...el, quantity: el.quantity - 1 },
      );
    }

    case 'CLEAR_CART': {
      return [];
    }

    default: {
      return state;
    }
  }
};
