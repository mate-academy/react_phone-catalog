import { createContext, useContext, useEffect, useState } from 'react';
import { CardItem } from '../../types/СardItem';

type CartRow = {
  item: CardItem;
  quantity: number;
};

type CartContextType = {
  cart: CartRow[];
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  toggleCart: (item: CardItem) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  removeFromCart: () => {},
  changeQuantity: () => {},
  toggleCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartRow[]>(() => {
    const stored = localStorage.getItem('cart');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(row => row.item.id !== id));
  };

  const changeQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(row =>
          row.item.id === id ? { ...row, quantity: row.quantity + delta } : row,
        )
        .filter(row => row.quantity > 0),
    );
  };

  const toggleCart = (item: CardItem) => {
    setCart(prev => {
      const existing = prev.find(row => row.item.id === item.id);

      if (existing) {
        return prev.filter(row => row.item.id !== item.id);
      }

      return [...prev, { item, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, removeFromCart, changeQuantity, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
