import React, { useState, useEffect } from 'react';
import { getProducts } from '../helpers/api';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { Product } from '../types/Product';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTablets = async () => {
    try {
      const products = await getProducts();

      const tabletsFromServer = products.filter(product => (
        product.type === 'tablet'
      ));

      if (tabletsFromServer.length === 0) {
        setError('Currently there are no tablets');

        return;
      }

      setTablets(tabletsFromServer);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTablets();
  }, []);

  return (
    <ProductsCatalog
      title="Tablets"
      breadcrumps="Tablets"
      isLoading={isLoading}
      products={tablets}
      error={error}
      setError={setError}
    />
  );
};
