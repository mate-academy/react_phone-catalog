import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (id: number) => boolean;
  add: (product: Product) => void;
  remove: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const isInCart = useCallback(
    (id: number) => items.some(i => i.product.id === id),
    [items],
  );

  const add = useCallback(
    (product: Product) => {
      setItems(prev => {
        if (prev.some(i => i.product.id === product.id)) {
          return prev;
        }
        return [...prev, { product, quantity: 1 }];
      });
    },
    [setItems],
  );

  const remove = useCallback(
    (id: number) => {
      setItems(prev => prev.filter(i => i.product.id !== id));
    },
    [setItems],
  );

  const increment = useCallback(
    (id: number) => {
      setItems(prev =>
        prev.map(i =>
          i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    },
    [setItems],
  );

  const decrement = useCallback(
    (id: number) => {
      setItems(prev =>
        prev.map(i =>
          i.product.id === id
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i,
        ),
      );
    },
    [setItems],
  );

  const clear = useCallback(() => setItems([]), [setItems]);

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const value = useMemo<CartState>(
    () => ({
      items,
      totalQuantity,
      totalPrice,
      isInCart,
      add,
      remove,
      increment,
      decrement,
      clear,
    }),
    [
      items,
      totalQuantity,
      totalPrice,
      isInCart,
      add,
      remove,
      increment,
      decrement,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
};
