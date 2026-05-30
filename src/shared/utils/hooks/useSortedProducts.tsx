import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { sortProducts } from '../sortHelper';
import { getProducts } from '../httpClient';

export const useFilteredProducts = (category: string) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setIsPageLoading(true);
      setIsError(false);

      try {
        const products = await getProducts();
        const productsByCategory = products.filter(
          item => item.category === category,
        );

        setFilteredProducts(productsByCategory);
      } catch (error) {
        setIsError(true);
      } finally {
        setTimeout(() => setIsPageLoading(false), 1000);
      }
    }

    loadProducts();
  }, [category]);

  return { filteredProducts, isPageLoading, isError };
};

export const useSortedProducts = (filteredProducts: Product[]) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getSorted = sortProducts(filteredProducts, sort);

    setSortedProducts(getSorted);
  }, [sort]);

  return { sortedProducts };
};
