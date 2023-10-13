import { useEffect, useState } from 'react';
import { NoResults } from '../components/NoResults';
import * as productsService from '../services/productsService';
import { Product } from '../types/Product';
import { ProductsPage } from '../components/ProductsPage';
import { Loader } from '../components/Loader';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    productsService.getPhones()
      .then(setPhones)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="phones">
      <Breadcrumbs category="Phones" />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {phones.length ? (
            <ProductsPage products={phones} category="Mobile phones" />
          ) : (
            <NoResults category="Mobile phones" />
          )}
        </>
      )}
    </div>
  );
};
