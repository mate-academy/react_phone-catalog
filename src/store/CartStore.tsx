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
  | { type: 'removeFromCart'; payload: string }
  | { type: 'increaseQuantity'; payload: string }
  | { type: 'decreaseQuantity'; payload: string }
  | { type: 'updateQuantity'; payload: { itemId: string; quantity: number } }
  | { type: 'clearCart' };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'addToCart': {
      const productId = action.payload.itemId || action.payload.id;

      if (!productId) {
        return state;
      }

      const existingProduct = state.find(item => {
        if (!item.product) {
          return false;
        }

        const itemId = item.product.itemId || item.product.id;

        return String(itemId) === String(productId);
      });

      if (existingProduct) {
        return state.map(item => {
          if (!item.product) {
            return item;
          }

          const itemId = item.product.itemId || item.product.id;

          return String(itemId) === String(productId)
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        return [...state, { product: action.payload, quantity: 1 }];
      }
    }

    case 'removeFromCart':
      return state.filter(product => {
        if (!product.product) {
          return false;
        }

        const itemId = product.product.itemId || product.product.id;

        return String(itemId) !== String(action.payload);
      });

    case 'increaseQuantity':
      return state.map(product => {
        if (!product.product) {
          return product;
        }

        const itemId = product.product.itemId || product.product.id;

        return String(itemId) === String(action.payload)
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      });

    case 'decreaseQuantity':
      return state.map(product => {
        if (!product.product) {
          return product;
        }

        const itemId = product.product.itemId || product.product.id;

        return String(itemId) === String(action.payload)
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });

    case 'updateQuantity':
      return state.map(product => {
        if (!product.product) {
          return product;
        }

        const itemId = product.product.itemId || product.product.id;

        return String(itemId) === String(action.payload.itemId)
          ? { ...product, quantity: action.payload.quantity }
          : product;
      });
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

const initialContextValue: CartContextValue = {
  cart: initialValue,
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

export const CartContext =
  React.createContext<CartContextValue>(initialContextValue);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initialValue);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'addToCart', payload: product });
  }, []);

  const removeFromCart = useCallback((product: Product) => {
    const productId = product.itemId || product.id;

    dispatch({ type: 'removeFromCart', payload: String(productId) });
  }, []);

  const increaseQuantity = useCallback((product: Product) => {
    const productId = product.itemId || product.id;

    dispatch({ type: 'increaseQuantity', payload: String(productId) });
  }, []);

  const decreaseQuantity = useCallback((product: Product) => {
    const productId = product.itemId || product.id;

    dispatch({ type: 'decreaseQuantity', payload: String(productId) });
  }, []);

  const updateQuantity = useCallback(
    (itemId: string | number, quantity: number) => {
      dispatch({
        type: 'updateQuantity',
        payload: { itemId: String(itemId), quantity },
      });
    },
    [],
  );

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
