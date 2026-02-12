import { CachedResult } from '../../../types/CachedResult';
import { Product } from '../../../types/Product';
import { getProducts } from '../../api/services/products';
import { productsCache } from '../../caches/cashes';
import { fetchWithCache } from '../../caches/fetchWithCache';

export const getCachedProducts = async (
  cashKey: string,
): Promise<CachedResult<Product>> => {
  const cacheKey = `${cashKey}`;

  return fetchWithCache<CachedResult<Product>>(
    cacheKey,
    async () => {
      const allProducts = await getProducts();

      return {
        items: allProducts,
        totalCount: allProducts.length,
      };
    },
    productsCache,
  );
};
