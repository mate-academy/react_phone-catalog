import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../servises/products';
import { ProductsCatalog } from '../ProductsCatalog';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('accessories')
      .then(setAccessories)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsCatalog
      title="Accessories"
      products={accessories}
      loading={loading}
      error={error}
    />
  );
};
