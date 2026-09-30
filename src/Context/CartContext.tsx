import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType } from '../types/CartItem';

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (id: string | number) => void;
  handleIncrease: (id: string | number) => void;
  handleDecrease: (id: string | number) => void;
  handleRemove: (id: string | number) => void;
  checkout: () => void;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id: string | number) => {
    const stringId = String(id);

    setCartItems(prev => {
      if (prev.some(item => item.id === stringId)) {
        return prev;
      }

      return [...prev, { id: stringId, quantity: 1 }];
    });
  };

  const handleIncrease = (id: string | number) => {
    const stringId = String(id);

    setCartItems(prev =>
      prev.map(item =>
        item.id === stringId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id: string | number) => {
    const stringId = String(id);

    setCartItems(prev =>
      prev
        .map(item =>
          item.id === stringId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const handleRemove = (id: string | number) => {
    const stringId = String(id);

    setCartItems(prev => prev.filter(item => item.id !== stringId));
  };

  const checkout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      setCartItems([]);
    }
  };

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        handleIncrease,
        handleDecrease,
        handleRemove,
        checkout,
        totalItemsCount,
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
