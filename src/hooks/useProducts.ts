import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import { Product } from '../types/Product';

export const useProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError('');

    getProducts()
      .then(data => {
        setProducts(data.filter(p => p.category === category));
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    reload: loadProducts,
  };
};
