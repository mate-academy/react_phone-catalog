import './TabletsPage.scss';

import { useContext, useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getTablets } from '../../api/products';
import { GlobalContext } from '../../GlobalContext';
import { Loader } from '../../components/Loader';

export const TabletsPage = () => {
  const [tabletsList, setTabletsList] = useState<Product[]>([]);
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);

    getTablets()
      .then(setTabletsList)
      .catch()
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <ProductsList products={tabletsList} />
      )}
    </>
  );
};
