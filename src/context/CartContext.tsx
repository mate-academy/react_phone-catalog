import { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (id: string) => void;
  decreaseFromCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    if (!saved) {
      return [];
    }

    try {
      const parsed = JSON.parse(saved);

      if (
        Array.isArray(parsed) &&
        parsed.every(
          item =>
            typeof item === 'object' &&
            item !== null &&
            typeof item.id === 'string' &&
            typeof item.quantity === 'number',
        )
      ) {
        return parsed;
      }

      return [];
    } catch {
      return [];
    }
  });

  const addToCart = (id: string) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);

      if (item) {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  const decreaseFromCart = (id: string) => {
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const isInCart = (id: string) => {
    return cart.some(item => item.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
