import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';
import { fetchWithDelay } from '../../../api/fetchWithDelay';

export const useCategories = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithDelay('api/products.json');
        const products: Product[] = await res.json();

        const newCounts = {
          phones: 0,
          tablets: 0,
          accessories: 0,
        };

        products.forEach(product => {
          if (product.category === 'phones') {
            newCounts.phones += 1;
          }

          if (product.category === 'tablets') {
            newCounts.tablets += 1;
          }

          if (product.category === 'accessories') {
            newCounts.accessories += 1;
          }
        });

        setCounts(newCounts);
      } catch {
        setCounts({
          phones: 0,
          tablets: 0,
          accessories: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return {
    counts,
    isLoading,
  };
};
