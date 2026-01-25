import { useEffect, useState } from 'react';
import { Product } from '../../../types/Product';

export const useCategories = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('api/products.json');
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
      }
    };

    load();
  }, []);

  return counts;
};
