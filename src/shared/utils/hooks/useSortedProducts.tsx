import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StateContext } from '../../../Provider/GadgetsContext';
import { Product } from '../../types/Product';
import { sortProducts } from '../sortHelper';

export const useSortedProducts = (category: string) => {
  const { products } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(true);

    new Promise<Product[]>(resolve => {
      const filteredProducts = products.filter(
        item => item.category === category,
      );

      resolve(sortProducts(filteredProducts, sort));
    })
      .then(sorted => setSortedProducts(sorted))
      .finally(() => {
        setTimeout(() => setIsPageLoading(false), 1000);
      });
  }, []);

  return { sortedProducts, isPageLoading };
};
