import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../helpers/getProductsByCategory';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import './PhonesPage.scss';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory('phones')
      .then(setPhones)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="phones-page">
      {loading ? (
        <Loader />
      ) : (
        <ProductsList
          title="Mobile phones"
          products={phones}
          data-cy="productList"
        />
      )}
    </div>
  );
};
