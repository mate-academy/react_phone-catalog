import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProductsByCategory } from '../helpers/getProductsByCategory';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategory('accessories')
      .then(setAccessories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="accessories-page">
      {loading ? (
        <Loader />
      ) : (
        <ProductsList
          title="Accessories"
          products={accessories}
          data-cy="productList"
        />
      )}
    </div>
  );
};
