import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProductByCategory } from '../api';
import { ProductCategory } from '../types/ProductDetails';

export const useProductsByCategory = (category: ProductCategory) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    getProductByCategory(category)
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
};
