import { createContext, useEffect, useState } from 'react';
import { Product } from '../api/type/ProductCart';
import { Favorites } from '../api/type/Favorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import React from 'react';

type FavoritesContextType = {
  favoriteProducts: Favorites;
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Favorites>>;
  addToFavorites: (newFavoriteProduct: Product) => void;
  toggleTheme: () => void;
  theme: string;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
  addToFavorites: () => {},
  toggleTheme: () => {},
  theme: '',
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useLocalStorage(
    'favoriteProducts',
    [] as Favorites,
  );
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addToFavorites = (newFavoriteProduct: Product) => {
    if (
      favoriteProducts.some(
        (prod: Product) => prod.id === newFavoriteProduct.id,
      )
    ) {
      setFavoriteProducts((currentFavorites: Favorites) => {
        return currentFavorites.filter(
          (prod: Product) => prod.id !== newFavoriteProduct.id,
        );
      });
    } else {
      setFavoriteProducts((currentFavorites: Favorites) => [
        ...currentFavorites,
        newFavoriteProduct,
      ]);
    } 
  };
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, setFavoriteProducts, addToFavorites, toggleTheme, theme }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};