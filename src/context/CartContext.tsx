import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks';
import { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ),
      isInCart: productId => items.some(item => item.id === productId),
      addToCart: product =>
        setItems(current => [
          ...current,
          { id: product.id, quantity: 1, product },
        ]),
      removeFromCart: productId =>
        setItems(current => current.filter(item => item.id !== productId)),
      changeQuantity: (productId, delta) =>
        setItems(current =>
          current.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        ),
      clearCart: () => setItems([]),
    }),
    [items, setItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
