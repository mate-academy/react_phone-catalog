import { Product } from '../../types/product';
import { useEffect, useState } from 'react';

type UseProductsPageParams = {
  fetchFn: () => Promise<Product[]>;
};

export const useProductsPage = ({ fetchFn }: UseProductsPageParams) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return {
    items,
    loading,
    error,
  };
};
