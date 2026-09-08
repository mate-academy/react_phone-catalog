// hooks/useCategoryCounts.ts
import { useEffect, useState } from 'react';
import { Category } from '../types/Category';
import { Product } from '../types/Product';

type CategoryCounts = Record<Category['name'], number>;

export const useCategoryCounts = () => {
  const [counts, setCounts] = useState<CategoryCounts>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const categories: Category['name'][] = ['phones', 'tablets', 'accessories'];

    Promise.all(
      categories.map(category =>
        fetch(`./api/${category}.json`).then(
          res => res.json() as Promise<Product[]>,
        ),
      ),
    ).then(results => {
      const newCounts: CategoryCounts = {
        phones: results[0].length,
        tablets: results[1].length,
        accessories: results[2].length,
      };

      setCounts(newCounts);
    });
  }, []);

  return counts;
};
