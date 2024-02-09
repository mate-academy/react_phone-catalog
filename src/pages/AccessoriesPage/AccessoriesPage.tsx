import './AccessoriesPage.scss';

import { useContext, useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/products';
import { GlobalContext } from '../../GlobalContext';
import { Loader } from '../../components/Loader';

export const AccessoriesPage = () => {
  const [accessoriesList, setAccessoriesList] = useState<Product[]>([]);
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);

    getAccessories()
      .then(setAccessoriesList)
      .catch()
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <ProductsList products={accessoriesList} />
      )}
    </>
  );
};
