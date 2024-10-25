import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../servises/products';
import { ProductsCatalog } from '../ProductsCatalog';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(setPhones)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsCatalog
      title="Mobile phones"
      products={phones}
      loading={loading}
      error={error}
    />
  );
};
