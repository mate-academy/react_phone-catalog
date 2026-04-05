import { useEffect, useState } from 'react';
import { CategoriesType } from '../types/Types';
import { getProducts } from '../api/product';

export const useCategoryCounts = () => {
  const [counts, setCounts] = useState({
    [CategoriesType.PHONES]: 0,
    [CategoriesType.TABLETS]: 0,
    [CategoriesType.ACCESSORIES]: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const products = await getProducts();

        const newCounts = {
          [CategoriesType.PHONES]: 0,
          [CategoriesType.TABLETS]: 0,
          [CategoriesType.ACCESSORIES]: 0,
        };

        products.forEach(product => {
          if (product.category === CategoriesType.PHONES) {
            newCounts[CategoriesType.PHONES]++;
          } else if (product.category === CategoriesType.TABLETS) {
            newCounts[CategoriesType.TABLETS]++;
          } else if (product.category === CategoriesType.ACCESSORIES) {
            newCounts[CategoriesType.ACCESSORIES]++;
          }
        });

        setCounts(newCounts);
      } catch (error) {
        throw new Error('Failed to fetch products for categories');
      }
    };

    fetchCounts();
  }, []);

  return counts;
};
