import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductPage } from '../../components/ProductPage';
import { getTablets } from '../../helpers/getTablets';
import { Product } from '../../types/Product';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await getTablets();

        setTablets(response);
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
          title="Tablets"
          products={tablets}
        />
      )}
    </>
  );
};
