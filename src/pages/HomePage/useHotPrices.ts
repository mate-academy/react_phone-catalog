import { useEffect, useState } from 'react';
import { productsCache } from '../../utils/caches/cashes';
import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api/services/products';
import { fetchWithCache } from '../../utils/caches/fetchWithCache';
import { cachesKey } from '../../utils/caches/constants';
import { AppErrors } from '../../types/AppErrors';
import { ApiError } from '../../services/Errors';
import { CachedResult } from '../../types/CachedResult';

export const useHotPrices = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);

  useEffect(() => {
    const cacheKey = cachesKey.hotPrices;

    setIsLoading(true);
    setError(null);

    fetchWithCache<CachedResult<Product>>(
      cacheKey,
      async () => {
        const allProducts = await getProducts();
        const sortedByPrice = [...allProducts].sort((a, b) => {
          const dA = a.fullPrice - a.price;
          const dB = b.fullPrice - b.price;

          return dB - dA;
        });

        const top20 = sortedByPrice.slice(0, 20);

        const random10 = top20.sort(() => Math.random() - 0.5).slice(0, 10);

        return {
          items: random10,
          totalCount: sortedByPrice.length,
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
