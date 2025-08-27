import React, { createContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ID = number;

type CartItem = { id: number; quantity: number };

type AddAndFavoritesContextType = {
  favorites: ID[];
  toggleFavorite: (id: ID) => void;
  isFavorite: (id: ID) => boolean;

  cart: CartItem[];
  toggleCart: (id: ID) => void;
  isInCart: (id: ID) => boolean;
  changeQuantity: (id: ID, command: 'plus' | 'minus' | 'delete') => void;

  clearCart: () => void;
};

export const AddAndFavoritesContext = createContext<AddAndFavoritesContextType>(
  {
    favorites: [],
    cart: [],

    toggleFavorite: () => {},
    toggleCart: () => {},
    changeQuantity: () => {},

    isFavorite: () => false,
    isInCart: () => false,
    clearCart: () => {},
  },
);

export const AddAndFavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<ID[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const toggleFavorite = (id: ID) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
  };

  const isFavorite = (id: ID) => favorites.includes(id);

  const toggleCart = (id: ID) => {
    const newCart = cart.some(item => item.id === id)
      ? cart.filter(item => item.id !== id)
      : [...cart, { id, quantity: 1 }];

    setCart(newCart);
  };

  const isInCart = (id: ID) => cart.some(item => item.id === id);

  const changeQuantity = (id: ID, command: 'plus' | 'minus' | 'delete') => {
    const newCart = cart.flatMap(item => {
      if (item.id !== id) return [item];

      if (command === 'plus') {
        return [{ ...item, quantity: item.quantity + 1 }];
      }

      if (command === 'minus') {
        return item.quantity > 1
          ? [{ ...item, quantity: item.quantity - 1 }]
          : [];
      }

      if (command === 'delete') {
        return [];
      }

      return [item];
    });

    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AddAndFavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,

        cart,
        toggleCart,
        isInCart,
        changeQuantity,

        clearCart,
      }}
    >
      {children}
    </AddAndFavoritesContext.Provider>
  );
};
