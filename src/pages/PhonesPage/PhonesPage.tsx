import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getPhones } from '../../services/products';
import { ProductsPage } from '../../components/ProductsPage';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPhones()
      .then(items => {
        setPhones(items);

        if (items.length === 0) {
          setErrorMessage('No phones are available');
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
      products={phones}
      title="Mobile phones"
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
