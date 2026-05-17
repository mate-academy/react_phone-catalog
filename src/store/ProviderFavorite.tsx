import React, { PropsWithChildren } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface initialFavoriteContext {
  favorites: string[];
  toogleProductFromFavourite: (id: string) => void;
  haveItemInFavourite: (id: string) => boolean;
  howManyItem: number;
}

export const ContextFavorite =
  React.createContext<initialFavoriteContext | null>(null);

export const ProviderFavorite: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoritesItem, setFavoritesItem] = useLocalStorage<string[]>(
    'favorites',
    [],
  );

  const toogleProductFromFavourite = (id: string) => {
    setFavoritesItem(prev =>
      prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id],
    );
  };

  const haveItemInFavourite = (id: string) => favoritesItem.includes(id);

  const howManyItem = favoritesItem.length;

  const value: initialFavoriteContext = {
    favorites: favoritesItem,
    toogleProductFromFavourite,
    haveItemInFavourite,
    howManyItem,
  };
  return (
    <ContextFavorite.Provider value={value}>
      {children}
    </ContextFavorite.Provider>
  );
};
