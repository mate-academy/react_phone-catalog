import { useEffect, useRef, useState } from 'react';
import { ProductDetails } from '../types/ProductDetails';

export const useProductDetails = (
  itemId: string | undefined,
  category: 'phones' | 'tablets' | 'accessories' | undefined,
) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const cache = useRef<Map<string, ProductDetails>>(new Map());

  useEffect(() => {
    if (!itemId || !category) {
      return;
    }

    const cacheKey = `${category}/${itemId}`;

    if (cache.current.has(cacheKey)) {
      setProduct(cache.current.get(cacheKey)!);
      setLoading(false);
      setError(false);

      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`api/${category}.json`);
        const data: ProductDetails[] = await response.json();

        const found = data.find(p => p.id === itemId);

        if (found) {
          cache.current.set(cacheKey, found);
          setProduct(found);
        } else {
          setProduct(null);
        }

        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId, category]);

  return { product, loading, error };
};
