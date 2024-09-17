import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';
import { Product } from '../types';

interface CartItem {
  phone: Product;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (phone: Product) => void;
  isInCart: (id: string) => boolean;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return state.some((item) => item.phone.id === action.payload.id)
        ? state
        : [...state, { phone: action.payload, quantity: 1 }];
    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.phone.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case 'DECREASE_QUANTITY':
      return state.map((item) =>
        item.phone.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    case 'REMOVE_ITEM':
      return state.filter((item) => item.phone.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialCartItems: CartItem[] = JSON.parse(
    localStorage.getItem('cartItems') || '[]',
  );
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (phone: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: phone });
  };

  const isInCart = (id: string) => {
    return cartItems.some((item) => item.phone.id === id);
  };

  const increaseQuantity = (id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
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