import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import { Product } from '../../public/api/types/Product';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => boolean;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: (id: string) => void;
  totalQuantity: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw =
      typeof window !== 'undefined' ? localStorage.getItem('cart') : null;

    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = product => {
    const exists = items.find(item => item.product.id === product.id);

    if (exists) {
      return false;
    }

    setItems(prev => [...prev, { id: product.id, product, quantity: 1 }]);

    return true;
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const increase = (id: string) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    );
  };

  const decrease = (id: string) => {
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i: { quantity: number }) => i.quantity > 0),
    );
  };

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (s, it) =>
          s +
          it.quantity *
            (it.product.priceAfterDiscount ?? it.product.price ?? 0),
        0,
      ),
    [items],
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  );
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        totalQuantity,
        totalAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
