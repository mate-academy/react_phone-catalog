import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/fetchProducts';
import { ProductType } from '../../types/ProductType';
import { ProductsPage } from '../ProductsPage';

import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const [productsAccessorie, setProductsAccessorie] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAccessories = async () => {
    setIsLoading(true);

    try {
      const getAccessoriesFromServer = (await getAllProducts())
        .filter(currentProduct => (
          currentProduct.category === ProductType.Accessory
        ));

      setProductsAccessorie(getAccessoriesFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <section className="Accessories">
      <div className="container">
        <ProductsPage
          title="Accessories"
          isError={isError}
          isLoading={isLoading}
          products={productsAccessorie}
          category={ProductType.Accessory}
        />
      </div>
    </section>
  );
};
