import React, { useState, useEffect } from 'react';
import { getProducts } from '../helpers/api';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { Product } from '../types/Product';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPhones = async () => {
    try {
      const products = await getProducts();

      const phonesFromServer = products.filter(product => (
        product.type === 'phone'
      ));

      if (phonesFromServer.length === 0) {
        setError('Currently there are no phones');

        return;
      }

      setPhones(phonesFromServer);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <ProductsCatalog
      title="Mobile phones"
      breadcrumps="Phones"
      isLoading={isLoading}
      products={phones}
      error={error}
      setError={setError}
    />
  );
};
