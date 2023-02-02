import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductPage } from '../../components/ProductPage';
import { getPhones } from '../../helpers/getPhones';
import { Product } from '../../types/Product';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPhones()
      .then(setPhones)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const showProductPage
    = !isLoading && !isError;

  return (
    <>
      {isLoading && (
        <div className="page__loader-container">
          <Loader />
        </div>
      )}
      {showProductPage && (
        <ProductPage
          title="Mobile phones"
          products={phones}
        />
      )}
    </>
  );
};
