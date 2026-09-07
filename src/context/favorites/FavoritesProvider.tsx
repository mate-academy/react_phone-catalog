import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Product } from '../../utils/types/Product';
import { useProducts } from '../products/useProducts';

type SavedItem = { itemId: string };

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { products, getProductById } = useProducts();
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });

  const favorites = useMemo<Product[]>(() => {
    if (!products.length) {
      return [];
    }

    return savedItems
      .map(({ itemId }) => {
        const product = getProductById(itemId);

        return product ? product : null;
      })
      .filter((x): x is Product => x !== null);
  }, [savedItems, products, getProductById]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToFavorites = (productId: string) => {
    setSavedItems(prev => {
      const existing = prev.find(item => item.itemId === productId);

      if (existing) {
        return prev;
      }

      return [...prev, { itemId: productId }];
    });
  };

  const removeFromFavorites = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.itemId !== id));
  };

  const clearFavorites = () => setSavedItems([]);

  const totalCount = favorites.length;

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      totalCount,
    }),
    [favorites, totalCount],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
