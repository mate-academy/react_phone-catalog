import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/getProducts';
import { getProductsByType }
  from '../../helpers/getFunctions/getProductsByType';
import { Loader } from '../../components/Loader';
import { ProductsCatalog } from '../../components/ProductsCatalog';

import './TabletsPage.scss';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(productsFromServer => (
        setTablets(getProductsByType(productsFromServer, 'tablets'))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getTablets = (
    products: Product[],
    title: string,
  ) => {
    if (isLoading) {
      return (
        <div className="tablets__loading">
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="tablets__error">
          There was an error, please try again later
        </p>
      );
    }

    return <ProductsCatalog products={products} title={title} />;
  };

  return (
    <div className="main__tablets tablets">
      {getTablets(
        tablets,
        'Tablets',
      )}
    </div>
  );
};
