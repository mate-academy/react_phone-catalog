import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { CartItem } from '../../../types/CartItem';
import { Product } from '../../../types/Product';

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const isInCart = useCallback(
    (productId: number) => items.some(item => item.id === productId),
    [items],
  );

  const addToCart = useCallback(
    (product: Product) => {
      setItems(prev =>
        prev.some(item => item.id === product.id)
          ? prev
          : [...prev, { id: product.id, quantity: 1, product }],
      );
    },
    [setItems],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setItems(prev => prev.filter(item => item.id !== productId));
    },
    [setItems],
  );

  const changeQuantity = useCallback(
    (productId: number, delta: number) => {
      setItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        ),
      );
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const value = useMemo(
    () => ({
      items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      isInCart,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
    }),
    [items, isInCart, addToCart, removeFromCart, changeQuantity, clearCart],
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
