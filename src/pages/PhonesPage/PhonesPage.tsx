import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductPage } from '../../components/ProductPage';
import { getPhones } from '../../helpers/getPhones';
import { Product } from '../../types/Product';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await getPhones();

        setPhones(response);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
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
