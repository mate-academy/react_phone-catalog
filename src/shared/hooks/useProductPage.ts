import { Product } from '../../types/product';
import { useEffect, useMemo, useState } from 'react';

type UseProductsPageParams = {
  fetchFn: () => Promise<Product[]>;
};

export const useProductsPage = ({ fetchFn }: UseProductsPageParams) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchFn();

        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [fetchFn]);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetically':
          return a.name.localeCompare(b.name);
        case 'cheapest':
          return a.price - b.price;
        default:
          return b.year - a.year; // newest
      }
    });
  }, [items, sortBy]);

  return {
    items,
    loading,
    error,
    sorted,
    sortBy,
    setSortBy,
  };
};
