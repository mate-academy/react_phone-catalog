import React, { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import './Accessories.scss';
import { getAccessories } from '../../utils/httpClient';
import { Product } from '../../shared/types/Product';

export const AccessoriesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessories, setAccessories] = useState<Product[] | []>([]);

  useEffect(() => {
    setLoading(true);
    const loadTimeout = setTimeout(() => {
      getAccessories()
        .then(data => {
          setAccessories(data);
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
    <div className="accessories">
      <ProductsList
        products={accessories}
        title={'Accessories'}
        isloading={loading}
        error={error}
      />
    </div>
  );
};
