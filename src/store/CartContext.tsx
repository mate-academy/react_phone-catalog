import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { Product } from '../types/Product';
import { CartContextValue, CartState } from '../types/ContextValues';

type Action =
  | { type: 'addToCart'; payload: Product }
  | { type: 'removeFromCart'; payload: number }
  | { type: 'increaseQuantity'; payload: number }
  | { type: 'decreaseQuantity'; payload: number }
  | { type: 'updateQuantity'; payload: { id: number; quantity: number } }
  | { type: 'clearCart' };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'addToCart':
      const existingProduct = state.find(
        product => product.product.id === action.payload.id,
      );

      if (existingProduct) {
        return [...state, { product: action.payload, quantity: 1 }];
      } else {
        return [...state, { product: action.payload, quantity: 1 }];
      }

    case 'removeFromCart':
      return state.filter(product => product.product.id !== action.payload);

    case 'increaseQuantity':
      return state.map(product =>
        product.product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );

    case 'decreaseQuantity':
      return state.map(product =>
        product.product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      );

    case 'updateQuantity':
      return state.map(product =>
        product.product.id === action.payload.id
          ? { ...product, quantity: action.payload.quantity }
          : product,
      );
    case 'clearCart':
      return [];
    default:
      return state;
  }
}

const keyIsPresent = localStorage.getItem('cart');
let initialValue = [];

if (keyIsPresent) {
  try {
    initialValue = JSON.parse(keyIsPresent);
  } catch (e) {
    throw new Error('Invalid JSON data in localStorage for "cart"');
  }
}

export const CartContext = React.createContext<CartContextValue>(initialValue);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialValue);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'addToCart', payload: product });
  }, []);

  const removeFromCart = useCallback((product: Product) => {
    dispatch({ type: 'removeFromCart', payload: product.id });
  }, []);

  const increaseQuantity = useCallback((product: Product) => {
    dispatch({ type: 'increaseQuantity', payload: product.id });
  }, []);

  const decreaseQuantity = useCallback((product: Product) => {
    dispatch({ type: 'decreaseQuantity', payload: product.id });
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    dispatch({ type: 'updateQuantity', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'clearCart' });
  }, []);

  const cartCount = cart.reduce((acc, current) => acc + current.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartValues = useMemo(
    () => ({
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
    }),
    [
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={cartValues}>{children}</CartContext.Provider>
  );
};

export const useCartValues = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error('Something is wrong with provider CartContext');
  }

  return value;
};
