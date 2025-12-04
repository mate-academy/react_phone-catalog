import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../types/Product'; // ✅ import do tipo centralizado

export type CartItem = {
  id: string;
  quantity: number;
  product: Product; // ✅ usa Product direto
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void; // ✅ recebe Product
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalQty: number;
  totalPrice: string;
};

const STORAGE_KEY = 'shopping_cart_v1';
const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const isInCart = (productId: string) =>
    items.some(i => i.product.id === productId);

  const addItem = (product: Product) => {
    setItems(prev => {
      if (prev.some(i => i.product.id === product.id)) {
        return prev;
      }

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, Math.floor(qty)) } : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalQty = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(() => {
    const sum = items.reduce((s, i) => {
      const numeric = parseFloat(
        i.product.price.replace(/[^\d,.-]/g, '').replace(',', '.'),
      );

      return s + (isNaN(numeric) ? 0 : numeric * i.quantity);
    }, 0);

    return `R$ ${sum.toFixed(2).replace('.', ',')}`;
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        isInCart,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
