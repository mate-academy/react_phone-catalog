import React, { useEffect, useState } from 'react';
import { Product } from "../modules/shared/types/Product";

interface FavoritesContextType {
  favorites: Product[],
  addFavorite: (product: Product) => void,
  removeFavorite: (productId: string) => void,
  toggleFavorite: (product: Product) => void
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
})

type Props = {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const STORAGE_FAVORITES_KEY = 'favorites';

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_FAVORITES_KEY);

    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites]);

  const addFavorite = (product: Product) => {
    setFavorites(prev => {
      const newFavorites = prev.map(item => item.productId === product.productId);

      if (newFavorites) {
        return prev;
      }

      return [...prev, product];
    });
  }

  const removeFavorite = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.productId !== productId))
  }

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const newFavorites = prev.some(item => item.productId === product.productId)

      if (newFavorites) {
        return prev.filter(item => item.productId !== product.productId);
      }

      return [...prev, product]
    })
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
