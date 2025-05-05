import { CartItem } from '../types/CartItem';

type State = {
  cart: CartItem[];
};

type Action =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INIT_CART'; payload: CartItem[] };

export const initialCartState = {
  cart: [],
};

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INIT_CART':
      return {
        cart: action.payload,
      };

    case 'ADD_ITEM': {
      const existingItem = state.cart.find(item => item.id === action.payload);
      const updatedCart = state.cart.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      return {
        cart: existingItem
          ? updatedCart
          : [...state.cart, { id: action.payload, quantity: 1 }],
      };
    }

    case 'DECREMENT_QUANTITY':
      return {
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};
