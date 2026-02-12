import { CartAction } from '../actions';
import { CartState, CartItem } from './cart.types';

export const cartInitialState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(i => i.id === action.payload.id);

      if (existing) {
        return state;
      }

      const newItem: CartItem = {
        id: action.payload.id,
        quantity: 1,
        product: action.payload,
      };

      return { items: [...state.items, newItem] };
    }

    case 'REMOVE_FROM_CART':
      return {
        items: state.items.filter(i => i.id !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        items: [],
      };

    case 'CHANGE_QUANTITY':
      return {
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i,
        ),
      };

    default:
      return state;
  }
}
