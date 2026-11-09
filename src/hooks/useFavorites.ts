import { useState } from 'react';
import { ProductDetails } from '../types/ProductDetails';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<ProductDetails[]>([]);

  const toggleFavorite = (product: ProductDetails) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === product.id);

      return exists
        ? prev.filter(f => f.id !== product.id)
        : [...prev, product];
    });
  };

  const isFavorite = (id: string) => favorites.some(f => f.id === id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loading: false,
    error: null,
  };
};
