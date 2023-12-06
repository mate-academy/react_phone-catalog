import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/getProducts';
import { getProductsByType }
  from '../../helpers/getFunctions/getProductsByType';
import { Loader } from '../../components/Loader';
import { ProductsCatalog } from '../../components/ProductsCatalog';

import './AccessoriesPage.scss';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(productsFromServer => (
        setAccessories(getProductsByType(productsFromServer, 'accessories'))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getAccessories = (
    products: Product[],
    title: string,
  ) => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <p className="error">Error</p>;
    }

    return <ProductsCatalog products={products} title={title} />;
  };

  return (
    <div className="main__accessories accessories">
      <div className="container">
        <div className="accessories__content">
          {getAccessories(
            accessories,
            'Accessories',
          )}
        </div>
      </div>
    </div>
  );
};
