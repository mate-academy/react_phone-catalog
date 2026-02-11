import { createContext, useContext, useMemo } from 'react';
import { CartItem, Product } from '../types';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useLocalStorageState<CartItem[]>('cart', []);
  const [totalQuantity, totalPrice] = useMemo(() => {
    return items.reduce(
      (acc, item) => [
        acc[0] + item.quantity,
        acc[1] + item.product.price * item.quantity,
      ],
      [0, 0],
    );
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.itemId);

      if (exists) {
        return prevItems;
      }

      return [...prevItems, { id: product.itemId, product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const changeQuantity = (id: string, quantity: number) => {
    setItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (id: string) => items.some(item => item.id === id);

  const value = {
    items,
    totalQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
