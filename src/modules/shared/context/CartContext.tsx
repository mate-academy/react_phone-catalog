import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type CartItem = {
  id: string;
  quantity: number;
};

type CartState = CartItem[];

type CartAction =
  | { type: 'ADD_PRODUCT'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingItem = state.find(item => item.id === action.payload);

      if (existingItem) {
        return state.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { id: action.payload, quantity: 1 }];
    }

    case 'DECREASE_QUANTITY': {
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0);
    }

    case 'REMOVE_PRODUCT':
      return state.filter(item => item.id !== action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

function loadCartFromStorage(): CartState {
  try {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

type CartContextType = {
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
