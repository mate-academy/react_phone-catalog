import React, { useMemo } from 'react';
import { Product } from './types';
import { useLocalStorage } from './useLocalStorage';

type CartContextType = {
  cartItems: Product[];
  setCartItems: (v: Product[]) => void;
  removeFromCart: (productId: number) => void;
};

type FavoritesContextType = {
  favoritesItems: Product[];
  setFavoritesItems: (v: Product[]) => void;
  removeFromFavorites: (productId: number) => void;
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  removeFromCart: () => {},
});

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favoritesItems: [],
  setFavoritesItems: () => {},
  removeFromFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      removeFromCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, setCartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoritesItems, setFavoritesItems] = useLocalStorage<Product[]>(
    'favoritesItems',
    [],
  );

  const removeFromFavorites = (productId: number) => {
    setFavoritesItems(favoritesItems.filter(item => item.id !== productId));
  };

  const value = useMemo(
    () => ({
      favoritesItems,
      setFavoritesItems,
      removeFromFavorites,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favoritesItems, setFavoritesItems],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
