import { useEffect, useState } from 'react';
import { productsCache } from '../../utils/caches/cashes';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api/services/products';
import { fetchWithCache } from '../../utils/caches/fetchWithCache';
import { cachesKey } from '../../utils/caches/constants';
import { AppErrors } from '../../types/AppErrors';
import { ApiError } from '../../services/Errors';
import { CachedResult } from '../../types/CachedResult';

export const useBrandNewModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);

  useEffect(() => {
    const cacheKey = cachesKey.brandNewModel;

    setIsLoading(true);
    setError(null);

    fetchWithCache<CachedResult<Product>>(
      cacheKey,
      async () => {
        const allProducts = await getProducts();

        const sortedByYear = [...allProducts].sort((a, b) => b.year - a.year);

        const top20 = sortedByYear.slice(0, 20);

        const random10 = top20.sort(() => Math.random() - 0.5).slice(0, 10);

        return {
          items: random10,
          totalCount: random10.length,
        };
      },
      productsCache,
    )
      .then(({ items }) => {
        setProducts(items);
      })
      .catch(errorData => {
        if (errorData instanceof ApiError) {
          setError(errorData.code);
        } else {
          setError('UNKNOWN_ERROR');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { products, isLoading, error };
};
