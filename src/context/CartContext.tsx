import React, { createContext, useContext, useState } from 'react';

type Product = {
  id: string | number;
  name: string;
  images?: string[];
  capacity?: string;
  colorsAvailable?: string[];
  priceRegular?: number;
  priceDiscount?: number;
  screen: string;
  ram: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cartItems: CartItem[];
  favourites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (id: string | number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  };

  const addToFavourites = (product: Product) => {
    setFavourites(prev => {
      const exists = prev.some(item => item.id === product.id);

      return exists
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product];
    });
  };

  const removeFromFavourites = (id: string | number) => {
    setFavourites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favourites,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToFavourites,
        removeFromFavourites,
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
