import { getAllProducts } from '../component/utils/sortingProducts';
import { useEffect, useState } from 'react';

export const useCategoryCount = (category: {
  category: string;
  path: string;
}) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getAllProducts();

        const categoryCount = allProducts.filter(
          product => product.category === category.category,
        ).length;

        setCount(categoryCount);
        setError(null);
      } catch (err) {
        setError('Failed to fetch category count');
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (category?.category) {
      fetchCount();
    }
  }, [category]);

  return { count, isLoading, error };
};
