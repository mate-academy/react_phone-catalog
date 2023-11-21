import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';
import { ProductsPage } from '../components/ProductsPage';
import * as productsService from '../services/productsService';
import { Product } from '../types/Product';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = 'Tablets';

  useEffect(() => {
    productsService.getTablets()
      .then(setTablets)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="tablets">
      <Breadcrumbs category={category} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {tablets.length ? (
            <ProductsPage products={tablets} category={category} />
          ) : (
            <NoResults category={category} />
          )}
        </>
      )}
    </div>
  );
};
