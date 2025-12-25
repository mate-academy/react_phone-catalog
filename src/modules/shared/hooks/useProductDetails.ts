import { useEffect, useRef, useState } from 'react';
import { ProductDetails } from '../../../types/ProductDetails';

export const useProductDetails = (
  namespaceId: string | undefined,
  category: 'phones' | 'tablets' | 'accessories' | undefined,
) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const cache = useRef<Map<string, ProductDetails>>(new Map());

  useEffect(() => {
    if (!namespaceId || !category) {
      setProduct(null);
      setLoading(false);
      setError(false);
      setNotFound(true);

      return;
    }

    const cacheKey = `${category}/${namespaceId}`;

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
        const [detailsRes, productsRes] = await Promise.all([
          fetch(`/react_phone-catalog/api/${category}.json`),
          fetch(`/react_phone-catalog/api/products.json`),
        ]);

        const detailsData: ProductDetails[] = await detailsRes.json();
        const productsData: { id: number; itemId: string }[] =
          await productsRes.json();

        const found = detailsData.find(p => p.namespaceId === namespaceId);

        if (!found) {
          setProduct(null);
          setNotFound(true);

          return;
        }

        const matchedProduct = productsData.find(p => p.itemId === found.id);

        const enrichedProduct: ProductDetails = {
          ...found,
          databaseId: matchedProduct?.id ?? -1,
        };

        cache.current.set(cacheKey, enrichedProduct);
        setProduct(enrichedProduct);
        setNotFound(false);
      } catch {
        setError(true);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [namespaceId, category]);

  return { product, loading, error, notFound };
};
