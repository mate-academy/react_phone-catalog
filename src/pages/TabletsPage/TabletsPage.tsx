import React, { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import './TabletsPage.scss';
import { getTablets } from '../../utils/httpClient';
import { Product } from '../../shared/types/Product';

export const TabletsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tablets, setTablets] = useState<Product[] | []>([]);

  useEffect(() => {
    setLoading(true);
    const loadTimeout = setTimeout(() => {
      getTablets()
        .then(data => {
          setTablets(data);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(loadTimeout);
  }, []);

  return (
    <div className="TabletsPage">
      <ProductsList
        products={tablets}
        title={'Tablets'}
        isloading={loading}
        error={error}
      />
    </div>
  );
};
