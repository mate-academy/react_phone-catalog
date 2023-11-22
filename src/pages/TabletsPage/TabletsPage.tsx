import {
  FC, useEffect, useState,
} from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsPage } from '../ProductsPage/ProductsPage';
import { ProductCategory } from '../../types/ProductCategory';

export const TabletsPage: FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchTablets = async () => {
      setIsLoading(true);

      try {
        const getTabletsFromServer = (await getProducts())
          .filter(product => product.category === ProductCategory.Tablets);

        setTablets(getTabletsFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTablets();
  }, []);

  return (
    <section className="tablets-page">
      <ProductsPage
        products={tablets}
        hasError={hasError}
        isLoading={isLoading}
        pageTitle="Tablets"
        productsCategory={ProductCategory.Tablets}
      />
    </section>
  );
};
