import './PhonesPage.scss';

import { useContext, useEffect, useState } from 'react';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/products';
import { GlobalContext } from '../../GlobalContext';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const [phonesList, setPhonesList] = useState<Product[]>([]);
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then(setPhonesList)
      .catch()
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <ProductsList products={phonesList} />
      )}
    </>
  );
};
