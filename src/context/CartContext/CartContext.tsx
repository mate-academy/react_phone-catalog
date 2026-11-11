import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

const STORAGE_KEY = 'cart';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  isInCart: (id: string) => boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: 1 | -1) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const readStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(readStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (id: string) => items.some(item => item.id === id);

  const addToCart = (id: string) => {
    setItems(prev =>
      prev.some(item => item.id === id) ? prev : [...prev, { id, quantity: 1 }],
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const changeQuantity = (id: string, delta: 1 | -1) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        isInCart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
};
