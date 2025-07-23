import React, { createContext, useState, useContext, useEffect } from 'react';
import { Products } from '../types/types';

// type CartItem = Products & { quantity: number };

interface CartContextProps {
  cartItems: Products[];
  setCartItems: React.Dispatch<React.SetStateAction<Products[]>>;
  lovelyProducts: Products[];
  setLovelyProducts: React.Dispatch<React.SetStateAction<Products[]>>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [lovelyProducts, setLovelyProducts] = useState<Products[]>([]);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem('favorites');
    const addedFromStorage = localStorage.getItem('added');

    if (addedFromStorage) {
      const addedProducts = JSON.parse(addedFromStorage);

      if (addedProducts.length > 0) {
        setLovelyProducts(addedProducts);
      }

      console.log(lovelyProducts);
    }

    if (favoritesFromStorage) {
      const favorites = JSON.parse(favoritesFromStorage);

      if (favorites.length > 0) {
        setLovelyProducts(favorites);
      }

      console.log(lovelyProducts);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, lovelyProducts, setLovelyProducts }}
    >
      {children}
    </CartContext.Provider>
  );
};
