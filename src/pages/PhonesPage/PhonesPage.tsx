import { useEffect, useState } from 'react';
import { Product } from '../../type/Product';
import { getPhones } from '../../api';
import { Catalog } from '../../components/Catalog';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPhones()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Catalog
      products={products}
      isLoading={isLoading}
      isError={isError}
      pageTitle="Mobile phones"
    />
  );
};
