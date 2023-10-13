import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';
import { ProductsPage } from '../components/ProductsPage';
import * as productsService from '../services/productsService';
import { Product } from '../types/Product';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = 'Accessories';

  useEffect(() => {
    productsService.getAccessories()
      .then(setAccessories)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="accessories">
      <Breadcrumbs category={category} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {accessories.length ? (
            <ProductsPage products={accessories} category={category} />
          ) : (
            <NoResults category={category} />
          )}
        </>
      )}
    </div>
  );
};
