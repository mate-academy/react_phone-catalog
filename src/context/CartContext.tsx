import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';

const STORAGE_KEY = 'cart';

type CartContextType = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const readFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(readFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const isInCart = (id: string) => items.some(item => item.id === id);

  const addToCart = (product: Product) => {
    setItems(prev => {
      if (prev.some(item => item.id === product.itemId)) {
        return prev;
      }

      return [...prev, { id: product.itemId, quantity: 1, product }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
