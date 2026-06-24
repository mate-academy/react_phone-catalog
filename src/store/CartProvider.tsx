import React, { useContext, useEffect, useReducer } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (
        state.items.find(item => item.product.itemId === action.payload.itemId)
      ) {
        return state;
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.payload.itemId,
            quantity: 1,
            product: action.payload,
          },
        ],
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
};

export const CartStateContext = React.createContext<CartState>(null!);
export const CartDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const useCartState = () => {
  const context = useContext(CartStateContext);

  if (!context) {
    throw new Error('State Error');
  }

  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);

  if (!context) {
    throw new Error('Dispatch Error');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
