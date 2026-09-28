import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Product } from '../types/Product';

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartQuantity: number;
  totalAmount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_STORAGE_KEY = 'nice-gadgets-cart';

type Props = {
  children: ReactNode;
};

const readCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (product: Product) => {
      setCartItems(currentItems => {
        const isAdded = currentItems.some(item => item.id === product.itemId);

        if (isAdded) {
          return currentItems;
        }

        return [
          ...currentItems,
          {
            id: product.itemId,
            product,
            quantity: 1,
          },
        ];
      });
    };

    const removeFromCart = (productId: string) => {
      setCartItems(currentItems => {
        return currentItems.filter(item => item.id !== productId);
      });
    };

    const incrementItem = (productId: string) => {
      setCartItems(currentItems => {
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      });
    };

    const decrementItem = (productId: string) => {
      setCartItems(currentItems => {
        return currentItems.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        );
      });
    };

    const clearCart = () => setCartItems([]);

    const isInCart = (productId: string) => {
      return cartItems.some(item => item.id === productId);
    };

    return {
      cartItems,
      cartQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      addToCart,
      removeFromCart,
      incrementItem,
      decrementItem,
      clearCart,
      isInCart,
    };
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
