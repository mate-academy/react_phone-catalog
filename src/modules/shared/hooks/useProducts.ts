import { useEffect, useState } from 'react';
import { getProducts } from '../../../api/products';
import { Product } from '../../../types/Product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        if (isCurrent) {
          setProducts(data);
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
  }, [reloadCount]);

  const reload = () => setReloadCount(count => count + 1);

  return { products, isLoading, hasError, reload };
}
