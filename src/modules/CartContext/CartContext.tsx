import React, { createContext, useContext, useEffect, useState } from 'react';
import { Gargets } from '../../interface/Gargets'; // заміни шлях за потреби

interface CartContextType {
  cartItems: Gargets[];
  favoriteItems: Gargets[];
  isMenuOpen: boolean; // Додано для збереження стану меню
  toggleMenu: () => void; // Додано для перемикання стану меню
  addToCart: (item: Gargets) => void;
  removeFromCart: (id: string) => void;
  addFavorite: (item: Gargets) => void;
  removeFavorite: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Gargets[]>(() => {
    try {
      const stored = localStorage.getItem('cartItems');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favoriteItems, setFavoriteItems] = useState<Gargets[]>(() => {
    try {
      const stored = localStorage.getItem('favoriteItems');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Додано для меню

  const toggleMenu = () => setIsMenuOpen(prev => !prev); // Функція для перемикання меню

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addToCart = (item: Gargets) => {
    setCartItems(prev => {
      if (prev.some(cartItem => cartItem.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(product => product.id !== id));
  };

  const addFavorite = (item: Gargets) => {
    setFavoriteItems(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  };

  const removeFavorite = (id: string) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favoriteItems,
        isMenuOpen,
        toggleMenu, // Додано в контекст
        addToCart,
        removeFromCart,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
