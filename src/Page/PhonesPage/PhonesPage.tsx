import { ProductList } from './../../component/ProductsList';
import { getProductsByCategory } from './../../component/utils/sortingProducts';
import { Products } from './../../types/Products';

import { useState, useEffect } from 'react';

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

  const mobileCategory = {
    path: '/phones',
    category: 'phones',
  };

  return (
    <ProductList
      title="Mobile phones"
      products={phones}
      loading={loading}
      category={mobileCategory}
      error={error}
    />
  );
};
