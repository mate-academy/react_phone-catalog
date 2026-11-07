import { CartItem } from '../../../types/CartItem';
import { Product } from '../../../types/Product';

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: string }
  | { type: 'increase'; id: string }
  | { type: 'decrease'; id: string }
  | { type: 'clear' };

export function cartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case 'add':
      if (state.some(item => item.id === action.product.itemId)) {
        return state;
      }

      return [
        ...state,
        { id: action.product.itemId, quantity: 1, product: action.product },
      ];

    case 'remove':
      return state.filter(item => item.id !== action.id);

    case 'increase':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );

    case 'decrease':
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

    case 'clear':
      return [];

    default:
      return state;
  }
}
