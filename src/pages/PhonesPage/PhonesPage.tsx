import React, { useEffect, useState } from 'react';
import { getProductsByType }
  from '../../helpers/getFunctions/getProductsByType';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/getProducts';
import { Loader } from '../../components/Loader';
import { ProductsCatalog } from '../../components/ProductsCatalog';

import './PhonesPage.scss';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(productsFromServer => (
        setPhones(getProductsByType(productsFromServer, 'phones'))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getPhones = (
    products: Product[],
    title: string,
  ) => {
    if (isLoading) {
      return (
        <div className="phones__loading">
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="phones__error">
          There was an error, please try again later
        </p>
      );
    }

    return <ProductsCatalog products={products} title={title} />;
  };

  return (
    <div className="main__phones phones">
      {getPhones(
        phones,
        'Mobile phones',
      )}
    </div>
  );
};
