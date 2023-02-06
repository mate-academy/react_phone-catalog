import React, { useEffect, useState } from 'react';
import { getProducts } from '../helpers/api';
import { ProductsCatalog } from '../components/ProductsCatalog';
import { Product } from '../types/Product';

export const AccesoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAccesories = async () => {
    try {
      const products = await getProducts();

      const accessoriesFromServer = products.filter(product => (
        product.type === 'accessory'
      ));

      if (accessoriesFromServer.length === 0) {
        setError('Currently there are no accesories');

        return;
      }

      setAccessories(accessoriesFromServer);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccesories();
  }, []);

  return (
    <ProductsCatalog
      title="Accesories"
      breadcrumps="Accesories"
      isLoading={isLoading}
      products={accessories}
      error={error}
      setError={setError}
    />
  );
};
