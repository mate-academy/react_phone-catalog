// path-to-your-CartProvider.tsx
import React, {
  createContext, useReducer, ReactNode, useContext,
} from 'react';
import { Product } from '../types/Product';

interface CartAction {
  type: 'ADD_TO_CART';
  payload: Product;
}

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

type CartContextType = {
  cart: Product[];
  handleAddToCart: (product: Product) => void;
};

export const CartContext = createContext<
CartContextType | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
