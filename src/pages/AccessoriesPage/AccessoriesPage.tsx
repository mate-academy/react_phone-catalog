import {
  FC, useEffect, useState,
} from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsPage } from '../ProductsPage/ProductsPage';
import { ProductCategory } from '../../types/ProductCategory';

export const AccessoriesPage: FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAccessories = async () => {
      setIsLoading(true);

      try {
        const getAccessoriesFromServer = (await getProducts())
          .filter(product => product.category === ProductCategory.Accessories);

        setAccessories(getAccessoriesFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  return (
    <section className="accessories-page">
      <ProductsPage
        products={accessories}
        hasError={hasError}
        isLoading={isLoading}
        pageTitle="Accessories"
        productsCategory={ProductCategory.Accessories}
      />
    </section>
  );
};
