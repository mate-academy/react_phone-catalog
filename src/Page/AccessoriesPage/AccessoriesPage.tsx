import { ProductList } from './../../component/ProductsList';
import { getProductsByCategory } from './../../component/utils/sortingProducts';
import { Products } from './../../types/Products';

import { useState, useEffect } from 'react';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('accessories')
      .then(setAccessories)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductList
      title="accessories"
      products={accessories}
      loading={loading}
      error={error}
    />
  );
};
