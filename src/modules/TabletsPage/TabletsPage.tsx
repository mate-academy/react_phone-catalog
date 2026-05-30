import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../utils/sortingProducts';
import { ProductList } from '../ProductsList/ProductsList';
import { Products } from '../../types/Products';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('tablets')
      .then(setTablets)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductList
      title="Tablets"
      products={tablets}
      loading={loading}
      error={error}
    />
  );
};
