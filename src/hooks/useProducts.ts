import { useCallback, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from '../api/client';

export const useProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError('');
    getProducts()
      .then(product => {
        setProducts(product.filter(p => p.category === category));
      })
      .catch(e => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, error, loading, reload: loadProducts };
};
