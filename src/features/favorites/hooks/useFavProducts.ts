import { getProducts } from '@/shared/api/api';
import { useAppSelector } from '@/store/hooks';
import { selectFavorites } from '@/store/slices/favoritesSlice';
import { Product } from '@/types/Product';
import { useEffect, useMemo, useState } from 'react';

export const useFavProducts = () => {
  const favorites = useAppSelector(selectFavorites);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(favorites.length > 0);

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false);

      return;
    }

    setLoading(true);

    getProducts()
      .then(fetchedProducts => {
        setProducts(fetchedProducts);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const preparedFavorites = useMemo(
    () => products.filter(product => favorites.includes(product.itemId)),
    [products, favorites],
  );

  return { favorites, products, preparedFavorites, loading };
};
