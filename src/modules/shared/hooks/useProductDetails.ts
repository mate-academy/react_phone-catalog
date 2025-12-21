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

  // normalize strings to compare safely
  const normalizeId = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[()]/g, '');

  useEffect(() => {
    if (!productId || !category) {
      setProduct(null);
      setLoading(false);
      setError(false);
      setNotFound(true);

      return;
    }

    const cacheKey = `${category}/${productId}`;

    // return cached product if exists
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
        // fetch both datasets in parallel
        const [detailsRes, productsRes] = await Promise.all([
          fetch(`/react_phone-catalog/api/${category}.json`),
          fetch(`/react_phone-catalog/api/products.json`),
        ]);

        const detailsData: ProductDetails[] = await detailsRes.json();
        const productsData: { id: number; itemId: string }[] =
          await productsRes.json();

        // find ProductDetails by namespaceId or normalized id
        const found = detailsData.find(
          p =>
            p.namespaceId === productId ||
            normalizeId(p.id) === normalizeId(productId),
        );

        if (!found) {
          setProduct(null);
          setNotFound(true);

          return;
        }

        // match with products.json by normalized itemId
        const matchedProduct = productsData.find(
          p => normalizeId(p.itemId) === normalizeId(found.id),
        );

        const enrichedProduct: ProductDetails = {
          ...found,
          databaseId: matchedProduct?.id ?? -1,
        };

        // cache & set state
        cache.current.set(cacheKey, enrichedProduct);
        setProduct(enrichedProduct);
        setNotFound(false);
      } catch (e) {
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
