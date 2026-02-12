import { useEffect, useState } from 'react';
import { fetchWithCache } from '../../utils/caches/fetchWithCache';
import { AppErrors } from '../../types/AppErrors';
import { ApiError } from '../../services/Errors';
import { getProductNameSpace } from '../../services/product';
import { getGoods } from '../../utils/api/services/goods';
import { CachedResult } from '../../types/CachedResult';
import { goodsCache } from '../../utils/caches/cashes';
import { Goods } from '../../types/Goods';

type Params = {
  id: string;
  source: string;
};

export const useGoods = ({ id, source }: Params) => {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppErrors | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const refetch = () => setRefetchIndex(i => i + 1);

  useEffect(() => {
    const namespace = getProductNameSpace(id);
    const cacheKey = `${source}-${namespace}`;

    setIsLoading(true);
    setError(null);

    fetchWithCache<CachedResult<Goods>>(
      cacheKey,
      async () => {
        const allProducts = await getGoods<Goods>(source);

        const filtered = allProducts.filter(p => p.namespaceId === namespace);

        return {
          items: filtered,
          totalCount: filtered.length,
        };
      },
      goodsCache,
    )
      .then(({ items, totalCount }) => {
        setGoods(items);
        setTotal(totalCount);
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
  }, [id, source, refetchIndex]);

  return { goods, total, isLoading, error, refetch };
};
