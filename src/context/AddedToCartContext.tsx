import { createContext, useContext, useState, useEffect } from 'react';
type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  addedToCart: CartItem[];
  addToCart: (id: string) => void;
  increment: (item: CartItem) => void;
  decrement: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [addedToCart, setAddedToCart] = useState(() => {
    const saved = localStorage.getItem('addedToCart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('addedToCart', JSON.stringify(addedToCart));
  }, [addedToCart]);
  const addToCart = (id: string) => {
    setAddedToCart((prev: CartItem[]) => {
      const isAlreadyAdded = prev.some(item => item.id === id);

      if (isAlreadyAdded) {
        return prev.filter(item => item.id !== id);
      }

      return [...prev, { id: id, quantity: 1 }];
    });
  };

  const increment = (item: CartItem) => {
    setAddedToCart((prev: CartItem[]) => {
      return prev.map(i =>
        i.id === item.id ? { id: i.id, quantity: i.quantity + 1 } : i,
      );
    });
  };

  const decrement = (item: CartItem) => {
    setAddedToCart((prev: CartItem[]) => {
      return prev.map(i =>
        i.id === item.id ? { id: i.id, quantity: i.quantity - 1 } : i,
      );
    });
  };

  return (
    <CartContext.Provider
      value={{ addedToCart, addToCart, increment, decrement }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useAddedToCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useAddedToCart must be used within CartProvider');
  }

  return context;
};
