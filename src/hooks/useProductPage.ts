import { useCallback, useEffect, useState } from 'react';
import { ProductPageData, getProductPageData } from '../utils/client';

// data: undefined - loading, null - the product does not exist
export const useProductPage = (itemId: string) => {
  const [data, setData] = useState<ProductPageData | null | undefined>(
    undefined,
  );
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    setHasError(false);

    // the previous data stays on the screen while the next variant is loading
    getProductPageData(itemId)
      .then(result => {
        if (!isCancelled) {
          setData(result);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [itemId, attempt]);

  const reload = useCallback(() => {
    setData(undefined);
    setAttempt(current => current + 1);
  }, []);

  return {
    data,
    isLoading: data === undefined && !hasError,
    hasError,
    reload,
  };
};
