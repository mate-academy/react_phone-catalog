import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  toggleCart: (product: Product) => void;
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

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.itemId !== id));
  };

  const toggleCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(p => p.itemId === product.itemId);

      return exists
        ? prev.filter(p => p.itemId !== product.itemId)
        : [...prev, { ...product, quantity: 1 }];
    });
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
        removeFromCart,
        toggleCart,
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
