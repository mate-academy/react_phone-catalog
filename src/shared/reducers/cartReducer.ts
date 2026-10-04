import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type CartAction =
  | {
      type: 'add';
      product: Product;
    }
  | {
      type: 'remove';
      itemId: string;
    }
  | {
      type: 'increase';
      itemId: string;
    }
  | {
      type: 'decrease';
      itemId: string;
    }
  | {
      type: 'clear';
    };

type CartState = {
  totalItems: number;
  totalProductsPrice: number;
  cart: CartItem[];
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existingItem = state.cart.find(
        item => item.id === String(action.product.id),
      );

      if (existingItem) {
        return state;
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: String(action.product.id),
            quantity: 1,
            product: action.product,
          },
        ],
      };
    }

    case 'remove':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.itemId !== action.itemId),
      };

    case 'increase':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.itemId === action.itemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };

    case 'decrease':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.itemId === action.itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),
      };

    case 'clear':
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}
