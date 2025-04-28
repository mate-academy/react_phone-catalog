import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../utils/sortingProducts';
import { ProductList } from '../ProductsList/ProductsList';
import { Products } from '../../types/Products';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductsByCategory('phones')
      .then(setPhones)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductList
      title="Mobile phones"
      products={phones}
      loading={loading}
      error={error}
    />
  );
};
