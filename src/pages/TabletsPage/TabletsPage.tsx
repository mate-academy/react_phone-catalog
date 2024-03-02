import { useEffect, useState } from 'react';
import { Product } from '../../type/Product';
import { getTablets } from '../../api';
import { Catalog } from '../../components/Catalog';

export const TabletsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getTablets()
      .then(setProducts)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Catalog
      products={products}
      isLoading={isLoading}
      isError={isError}
      pageTitle="Tablets"
    />
  );
};
