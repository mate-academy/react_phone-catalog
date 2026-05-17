import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartEntry } from '../types';
import { readStorage, writeStorage } from '../utils/storage';

type CartContextType = {
  items: CartEntry[];
  totalQuantity: number;
  addToCart: (itemId: string) => void;
  toggleCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  changeQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getQuantity: (itemId: string) => number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'phone_catalog_cart';

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartEntry[]>(() =>
    readStorage<CartEntry[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, items);
  }, [items]);

  const value = useMemo<CartContextType>(() => {
    const addToCart = (itemId: string) => {
      setItems(current => {
        if (current.some(item => item.itemId === itemId)) {
          return current;
        }

        return [...current, { itemId, quantity: 1 }];
      });
    };

    const removeFromCart = (itemId: string) => {
      setItems(current => current.filter(item => item.itemId !== itemId));
    };

    const toggleCart = (itemId: string) => {
      setItems(current => {
        const exists = current.some(item => item.itemId === itemId);

        if (exists) {
          return current.filter(item => item.itemId !== itemId);
        }

        return [...current, { itemId, quantity: 1 }];
      });
    };

    const changeQuantity = (itemId: string, quantity: number) => {
      setItems(current =>
        current
          .map(item => (item.itemId === itemId ? { ...item, quantity } : item))
          .filter(item => item.quantity > 0),
      );
    };

    const clearCart = () => setItems([]);

    const isInCart = (itemId: string) =>
      items.some(item => item.itemId === itemId);

    const getQuantity = (itemId: string) =>
      items.find(item => item.itemId === itemId)?.quantity || 0;

    return {
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      addToCart,
      toggleCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      isInCart,
      getQuantity,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
