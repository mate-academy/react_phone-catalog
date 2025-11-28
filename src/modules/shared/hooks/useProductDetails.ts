import { useEffect, useRef, useState } from 'react';
import { ProductDetails } from '../../../types/ProductDetails';

export const useProductDetails = (
  productId: string | undefined,
  category: 'phones' | 'tablets' | 'accessories' | undefined,
) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const cache = useRef<Map<string, ProductDetails>>(new Map());

  useEffect(() => {
    if (!productId || !category) {
      setProduct(null);
      setLoading(false);
      setError(false);
      setNotFound(true);

      return;
    }

    const cacheKey = `${category}/${productId}`;

    if (cache.current.has(cacheKey)) {
      setProduct(cache.current.get(cacheKey)!);
      setLoading(false);
      setError(false);
      setNotFound(false);

      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setNotFound(false);

      try {
        const response = await fetch(`/api/${category}.json`);
        const data: ProductDetails[] = await response.json();

        const found = data.find(p => p.id === productId);

        if (found) {
          cache.current.set(cacheKey, found);
          setProduct(found);
          setNotFound(false);
        } else {
          setProduct(null);
          setNotFound(true);
        }
      } catch {
        setError(true);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, category]);

  return { product, loading, error, notFound };
};
