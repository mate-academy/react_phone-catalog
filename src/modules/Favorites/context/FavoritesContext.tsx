import { createContext, useContext, useEffect, useState } from 'react';
import { FavoritesContextValue } from '../interfaces/FavoritesContextValue';
import { Product } from '../../Catalog/interfaces/Product';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');

      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Invalid favorites data in localStorage:', e);
      localStorage.removeItem('favorites');

      return [];
    }
  });

  // const [imgPrefix, setImgPrefix] = useState('');

  // const isChrome = () => {
  //   const w = window as any;

  //   return (
  //     !!w.chrome &&
  //     navigator.vendor === 'Google Inc.' &&
  //     navigator.userAgent.includes('Chrome')
  //   );
  // };

  // useEffect(() => {
  //   if (isChrome()) {
  //     setImgPrefix('.');
  //   }
  // }, []);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  const isFavorite = (id: string) => favorites.some(p => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
};
