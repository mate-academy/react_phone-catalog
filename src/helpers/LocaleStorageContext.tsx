import React from 'react';
import { Product } from '../types/Product';
import { CartItemType } from '../types/CartItemType';
import { useLocalStorage } from './useLocaleStorage';

interface CartContextType {
  cart: CartItemType[],
  setCart: (cartItems: CartItemType[]) => void,
}

interface FavoritesContextType {
  favorites: Product[],
  setFavorites: (cartItems: Product[]) => void,
}

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LocaleStorageProvider = ({ children }: Props) => {
  const [cart, setCart] = useLocalStorage('cart');
  const [favorites, setFavorites] = useLocalStorage('favorites');

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
    }}
    >
      <FavoritesContext.Provider value={{
        favorites,
        setFavorites,
      }}
      >
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};
