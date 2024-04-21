import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAccessories } from '../../services/products';
import { ProductsPage } from '../../components/ProductsPage';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getAccessories()
      .then(items => {
        setAccessories(items);

        if (items.length === 0) {
          setErrorMessage('No accessories are available');
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
      products={accessories}
      title="Accessories"
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
