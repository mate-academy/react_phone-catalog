import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Product } from '../types/Product';
import { containQuery } from '../utils/containQuery';

export const useSearchedItems = (products: Product[]) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const searchedItems = useMemo(() => {
    return query
      ? products.filter(product => containQuery(product, query))
      : products;
  }, [products, query]);

  return searchedItems;
};
