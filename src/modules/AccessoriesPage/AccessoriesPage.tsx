import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../utils/sortingProducts';
import { ProductList } from '../ProductsList/ProductsList';
import { Products } from '../../types/Products';

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
      title="Accessories"
      products={accessories}
      loading={loading}
      error={error}
    />
  );
};
