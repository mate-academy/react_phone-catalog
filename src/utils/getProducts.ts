import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api';

export const useProducts = () => {
  const [allProducts, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  return { allProducts, loading, error };
};
