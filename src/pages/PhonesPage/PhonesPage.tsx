import React, { useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductList/ProductList';
import './PhonesPage.scss';
import { Product } from '../../shared/types/Product';
import { getPhones } from '../../utils/httpClient';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const loadTimeout = setTimeout(() => {
      getPhones()
        .then(data => {
          setPhones(data);
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
    <div className="phonesPage">
      <ProductsList
        products={phones}
        title={'Mobile phones'}
        isloading={loading}
        error={error}
      />
    </div>
  );
};
