import { useEffect, useState } from 'react';

import type { ProductDetails } from '../types/ProductDetails';

const categoryCache = new Map<string, ProductDetails[]>();

export const useItemDetails = (itemId: string, category: string) => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemId) {
      setProduct(null);
      setVariants([]);
      setLoading(false);
      setError('Invalid item');

      return;
    }

    if (!category) {
      setLoading(true);
      setError(null);

      return;
    }

    let cancelled = false;

    const updateFromAll = (all: ProductDetails[]) => {
      const current = all.find(item => item.id === itemId);

      if (!current) {
        throw new Error(`Item ${itemId} not found`);
      }

      const family = all.filter(
        item => item.namespaceId === current.namespaceId,
      );

      if (cancelled) {
        return;
      }

      setProduct(current);
      setVariants(family);
      setLoading(false);
      setError(null);
    };

    const load = async () => {
      try {
        const cached = categoryCache.get(category);

        if (cached) {
          updateFromAll(cached);

          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.BASE_URL}/api/${category}.json`,
        );

        if (!response.ok) {
          throw new Error('Failed to load item details');
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid product data format');
        }

        const all = data as ProductDetails[];

        categoryCache.set(category, all);

        updateFromAll(all);
      } catch (err) {
        if (!cancelled) {
          setProduct(null);
          setVariants([]);
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [itemId, category]);

  return {
    product,
    variants,
    loading,
    error,
  };
};
