import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import type { Product, CartItem } from '../types/Product';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: 1 | -1) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        item &&
        typeof item.id === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        item.product &&
        typeof item.product.id === 'number',
    );
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore quota errors
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveCart(items);
    }
  }, [items, initialized]);

  const addToCart = useCallback((product: Product): void => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev;
      }

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  }, []);

  const removeFromCart = useCallback((id: number): void => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const changeQuantity = useCallback((id: number, delta: 1 | -1): void => {
    setItems(prev =>
      prev.map(item => {
        if (item.id !== id) {
          return item;
        }

        const newQuantity = item.quantity + delta;

        if (newQuantity < 1) {
          return item;
        }

        return { ...item, quantity: newQuantity };
      }),
    );
  }, []);

  const clearCart = useCallback((): void => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (id: number): boolean => {
      return items.some(item => item.id === id);
    },
    [items],
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        isInCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
