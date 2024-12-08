import { useEffect, useState } from 'react';

import { useStoredProducts } from '@shared/contexts/StoredProducts';
import { getProductById } from '@shared/services/api/api';
import { ProductModel } from '@shared/types/Product';

export const useFavorites = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [favorites, setFavorites] = useState<ProductModel[] | null>(null);

  const {
    storedProducts: { favoriteProducts },
  } = useStoredProducts();

  useEffect(() => {
    Promise.all(
      favoriteProducts.map(({ productId }) => getProductById(productId)),
    )
      .then(response => {
        setFavorites(response.filter(product => !!product));
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, [favoriteProducts]);

  return {
    favorites,
    isInitialLoading,
  };
};
