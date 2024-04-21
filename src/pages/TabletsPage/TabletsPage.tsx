import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getTablets } from '../../services/products';
import { ProductsPage } from '../../components/ProductsPage';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getTablets()
      .then(items => {
        setTablets(items);

        if (items.length === 0) {
          setErrorMessage('No tablets are available');
        }
      })
      .catch((error) => {
        setErrorMessage('Ooops... try again later');

        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductsPage
      products={tablets}
      title="Tablets"
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
