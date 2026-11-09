import { useEffect, useState } from 'react';
import { getProductDetails } from '../../../api/products';
import { ProductWithDetails } from '../../../types/ProductWithDetails';

export function useProductDetails(productId: string) {
  const [data, setData] = useState<ProductWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    setHasError(false);

    getProductDetails(productId)
      .then(result => {
        if (isCurrent) {
          setData(result);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [productId, reloadCount]);

  const reload = () => setReloadCount(count => count + 1);

  return { data, isLoading, hasError, reload };
}
