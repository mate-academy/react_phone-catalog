import { Product } from '../types/Product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartAction =
  | { type: 'Add'; product: Product }
  | { type: 'Remove'; id: string }
  | { type: 'Increase'; id: string }
  | { type: 'Decrease'; id: string }
  | { type: 'Clear' };

export const CartReducer = (state: CartItem[], action: CartAction) => {
  switch (action.type) {
    case 'Add':
      return [...state, { product: action.product, quantity: 1 }];

    case 'Remove':
      return state.filter(item => item.product.id !== action.id);

    case 'Increase':
      return state.map(item =>
        item.product.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    case 'Decrease':
      return state.map(item =>
        item.product.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

    case 'Clear':
      return [];

    default:
      return state;
  }
};
