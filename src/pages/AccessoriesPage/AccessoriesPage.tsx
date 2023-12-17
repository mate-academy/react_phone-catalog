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
      return (
        <div className="accessories__loading">
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="accessories__error">
          There was an error, please try again later
        </p>
      );
    }

    return <ProductsCatalog products={products} title={title} />;
  };

  return (
    <div className="main__accessories accessories">
      {getAccessories(
        accessories,
        'Accessories',
      )}
    </div>
  );
};
