import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { ProductPage } from '../../components/ProductPage';
import { getAccessories } from '../../helpers/getAccessories';
import { Product } from '../../types/Product';

export const AccessoriesPage: React.FC = () => {
  const [acessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await getAccessories();

        setAccessories(response);
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
          title="Accessories"
          products={acessories}
        />
      )}
    </>
  );
};
