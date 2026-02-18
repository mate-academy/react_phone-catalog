import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type ID = number;
type CartItem = { id: number; quantity: number };

type CartAndFavouritesContextType = {
  favourites: ID[];
  toggleFavourite: (id: ID) => void;
  isFavourite: (id: ID) => boolean;

  cart: CartItem[];
  toggleCart: (id: ID) => void;
  isInCart: (id: ID) => boolean;
  changeQuantity: (id: ID, action: 'plus' | 'minus' | 'delete') => void;

  clearCart: () => void;
};

const defaultContext: CartAndFavouritesContextType = {
  favourites: [],
  cart: [],
  toggleFavourite: () => {},
  toggleCart: () => {},
  changeQuantity: () => {},
  isFavourite: () => false,
  isInCart: () => false,
  clearCart: () => {},
};

export const CartAndFavouritesContext =
  createContext<CartAndFavouritesContextType>(defaultContext);

export const CartAndFavouritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<ID[]>('favourites', []);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  // Favourites
  const toggleFavourite = (id: ID) => {
    const newFavourites = favourites.includes(id)
      ? favourites.filter(f => f !== id)
      : [...favourites, id];

    setFavourites(newFavourites);
  };

  const isFavourite = (id: ID) => favourites.includes(id);

  // Cart
  const toggleCart = (id: ID) => {
    const exists = cart.some(item => item.id === id);

    const newCart = exists
      ? cart.filter(item => item.id !== id)
      : [...cart, { id, quantity: 1 }];

    setCart(newCart);
  };

  const isInCart = (id: ID) => cart.some(item => item.id === id);

  const changeQuantity = (id: ID, action: 'plus' | 'minus' | 'delete') => {
    const newCart = cart.flatMap(item => {
      if (item.id !== id) {
        return [item];
      }

      if (action === 'plus') {
        return [{ ...item, quantity: item.quantity + 1 }];
      }

      if (action === 'minus') {
        return item.quantity > 1
          ? [{ ...item, quantity: item.quantity - 1 }]
          : [];
      }

      if (action === 'delete') {
        return [];
      }

      return [item];
    });

    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  return (
    <CartAndFavouritesContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,

        cart,
        toggleCart,
        isInCart,
        changeQuantity,

        clearCart,
      }}
    >
      {children}
    </CartAndFavouritesContext.Provider>
  );
};

// Custom hook for easy usage
export const useCartAndFavourites = () => useContext(CartAndFavouritesContext);
