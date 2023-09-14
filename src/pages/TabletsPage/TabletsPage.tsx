import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/fetchProducts';
import { ProductType } from '../../types/ProductType';

import './TabletsPage.scss';
import { ProductPage } from '../ProductPage';

export const TabletPage = () => {
  const [productsTablet, setProductsTablet] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchTablets = async () => {
    setIsLoading(true);

    try {
      const getTabletsFromServer = (await getAllProducts())
        .filter(currentProduct => (
          currentProduct.category === ProductType.Tablet
        ));

      setProductsTablet(getTabletsFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  return (
    <section className="tablets">
      <div className="container">
        <ProductPage
          title="Tablets"
          isError={isError}
          isLoading={isLoading}
          products={productsTablet}
          category={ProductType.Tablet}
        />
      </div>
    </section>
  );
};
