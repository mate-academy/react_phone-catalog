import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../helpers/getProductsByCategory';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import './TabletsPage.scss';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory('tablets')
      .then(setTablets)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tablets-page">
      {loading ? (
        <Loader />
      ) : (
        <ProductsList
          title="Tablets"
          products={tablets}
          data-cy="productList"
        />
      )}
    </div>
  );
};
