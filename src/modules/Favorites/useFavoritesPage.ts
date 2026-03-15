import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../types/ContextProps';

export const useFavoritesPage = () => {
  const { products: allProducts, favorites } = useOutletContext<ContextProps>();

  const favoriteProducts = useMemo(() => {
    return allProducts.filter(product => favorites.includes(product.itemId));
  }, [allProducts, favorites]);

  return {
    favoriteProducts,
    count: favoriteProducts.length,
  };
};
