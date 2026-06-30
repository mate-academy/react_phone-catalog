import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { Product } from '../../../api/products';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  changeQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);

    return saved ? JSON.parse(saved) : [];
  });

  const { totalPrice, totalItems } = useMemo(() => {
    const price = items.reduce((sum, item) => {
      const itemPrice = item.product.priceDiscount ?? item.product.price ?? 0;

      return sum + itemPrice * item.quantity;
    }, 0);
    const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { totalPrice: price, totalItems: itemsCount };
  }, [items]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product: Product) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) {
        return prev;
      }

      return [...prev, { id: product.id, product, quantity: 1 }];
    });
  };

  const remove = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));
  const changeQty = (id: string, qty: number) =>
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)),
    );
  const clear = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        totalItems,
        add,
        remove,
        changeQty,
        clear,
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
