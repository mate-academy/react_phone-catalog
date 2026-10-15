import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/product';

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart);
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const isAlreadyInCart = prev.some(
        item => item.product.itemId === product.itemId,
      );

      if (isAlreadyInCart) {
        return prev;
      }

      const newItem: CartItem = {
        id: product.itemId,
        quantity: 1,
        product,
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.product.itemId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.product.itemId === id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    let total = 0;

    for (const item of items) {
      total += item.quantity;
    }

    return total;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
