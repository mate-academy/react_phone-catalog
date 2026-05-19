import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Id = string;

type CartType = { id: string; quantity: number };

type Commands = 'plus' | 'minus' | 'delete';

type CartAndFavType = {
  favorites: Id[];
  cart: CartType[];

  toggleFavorite: (id: Id) => void;
  toggleCart: (id: Id) => void;

  isFavorite: (id: Id) => boolean;
  isCart: (id: Id) => boolean;

  changeQuantity: (id: Id, command: Commands) => void;
  clearCart: () => void;
};

export const CartAndFavContext = createContext<CartAndFavType>({
  favorites: [],
  cart: [],

  toggleFavorite: () => {},
  toggleCart: () => {},

  isFavorite: () => false,
  isCart: () => false,

  changeQuantity: () => {},
  clearCart: () => {},
});

export const CartAndFavProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Id[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<CartType[]>('cart', []);

  const toggleFavorite = (id: Id) => {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id],
    );
  };

  const toggleCart = (id: Id) => {
    setCart(
      cart.some(item => item.id === id)
        ? cart.filter(item => item.id !== id)
        : [...cart, { id, quantity: 1 }],
    );
  };

  const isFavorite = (id: Id) => favorites.includes(id);
  const isCart = (id: Id) => cart.some(item => item.id === id);

  const changeQuantity = (id: Id, command: Commands) => {
    const newCart = cart.flatMap(item => {
      if (item.id !== id) {
        return [item];
      }

      if (command === 'plus') {
        return [{ ...item, quantity: item.quantity + 1 }];
      } else if (command === 'minus') {
        return item.quantity > 1
          ? [{ ...item, quantity: item.quantity - 1 }]
          : [];
      } else if (command === 'delete') {
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
    <CartAndFavContext.Provider
      value={{
        favorites,
        cart,

        toggleFavorite,
        toggleCart,

        isFavorite,
        isCart,

        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartAndFavContext.Provider>
  );
};

export const useCartAndFavContext = () => {
  return useContext(CartAndFavContext);
};
