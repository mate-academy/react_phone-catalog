import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  getTotalCount: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(p => p.itemId === product.itemId);

      if (exists) {
        return prev;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.itemId !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalCount = () => cart.reduce((sum, p) => sum + p.quantity, 0);

  const changeQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(p =>
        p.itemId === id ? { ...p, quantity: Math.max(1, quantity) } : p,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        getTotalCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used within CartProvider');
  }

  return cartContext;
};
