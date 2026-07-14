import { ProductList } from './../../component/ProductsList';
import { getProductsByCategory } from './../../component/utils/sortingProducts';
import { Products } from './../../types/Products';

import { useState, useEffect } from 'react';

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

  const TabletsCategory = {
    path: '/tablets',
    category: 'tablets',
  };

  return (
    <ProductList
      title="tablets"
      products={tablets}
      loading={loading}
      error={error}
      category={TabletsCategory}
    />
  );
};
