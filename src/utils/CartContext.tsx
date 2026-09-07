import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/ProductTypes';
import { Phone } from '../types/PhoneTypes';
import { Tablet } from '../types/TabletType';
import { Accessory } from '../types/AccessorieTypes';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product | Phone | Tablet | Accessory;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product | Phone | Tablet | Accessory }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product | Phone | Tablet | Accessory) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getProductId = (product: Product | Phone | Tablet | Accessory): string => {
  if (typeof product.id === 'number') {
    return (product as Product).itemId;
  }
  return product.id;
};

const getProductPrice = (product: Product | Phone | Tablet | Accessory): number => {
  if ('price' in product) {
    return product.price;
  }
  return product.priceDiscount;
};

const calculateTotals = (items: CartItem[]): { totalQuantity: number; totalAmount: number } => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = getProductPrice(item.product);
    return sum + price * item.quantity;
  }, 0);

  return { totalQuantity, totalAmount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const productId = getProductId(action.payload);
      const existingItem = state.items.find(item => item.id === productId);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        newItems = [
          ...state.items,
          {
            id: productId,
            quantity: 1,
            product: action.payload,
          },
        ];
      }

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id);
        const totals = calculateTotals(newItems);
        return {
          items: newItems,
          ...totals,
        };
      }

      const newItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      );

      const totals = calculateTotals(newItems);
      return {
        items: newItems,
        ...totals,
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      };

    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload);
      return {
        items: action.payload,
        ...totals,
      };
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product | Phone | Tablet | Accessory) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: string): boolean => {
    return state.items.some(item => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
