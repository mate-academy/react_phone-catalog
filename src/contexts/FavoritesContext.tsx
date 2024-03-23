import React from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../helpers/useLocalStorage';

interface State {
  favorites: Product[];
  setFavorites: (products: Product[]) => void;
  addToFavorites: (product: Product) => void;
}

const initialState: State = {
  favorites: [],
  setFavorites: () => {},
  addToFavorites: () => {},
};

export const FavoritesContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addToFavorites = (product: Product) => {
    if (favorites.some(item => item.id === product.id)) {
      setFavorites(favorites.filter(item => item.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const value: State = {
    favorites,
    setFavorites,
    addToFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
