import { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  itemId: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  toggleCart: (itemId: string) => void;
  clearCart: () => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  const updateLocalStorage = (newCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const toggleCart = (itemId: string) => {
    setCart(prev => {
      const exists = prev.find(item => item.itemId === itemId);
      const updatedCart = exists
        ? prev.filter(item => item.itemId !== itemId)
        : [...prev, { itemId, quantity: 1 }];

      updateLocalStorage(updatedCart);

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    updateLocalStorage([]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const updatedCart = prev.filter(item => item.itemId !== itemId);

      updateLocalStorage(updatedCart);

      return updatedCart;
    });
  };

  const increaseQuantity = (itemId: string) => {
    setCart(prev => {
      const updatedCart = prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      updateLocalStorage(updatedCart);

      return updatedCart;
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCart(prev => {
      const updatedCart = prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      );

      updateLocalStorage(updatedCart);

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        clearCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
