import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../services/products';
import { ProductsCatalog } from '../ProductsCatalog';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('tablets')
      .then(setTablets)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsCatalog
      title="Tablets"
      products={tablets}
      loading={loading}
      error={error}
    />
  );
};
