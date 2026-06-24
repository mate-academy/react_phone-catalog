import { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { getProducts } from '@/shared/api/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  return products;
};
