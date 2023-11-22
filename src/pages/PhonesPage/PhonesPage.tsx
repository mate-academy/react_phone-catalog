import {
  FC, useEffect, useState,
} from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsPage } from '../ProductsPage/ProductsPage';
import { ProductCategory } from '../../types/ProductCategory';

export const PhonesPage: FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPhones = async () => {
      setIsLoading(true);

      try {
        const getPhonesFromServer = (await getProducts())
          .filter(product => product.category === ProductCategory.Phones);

        setPhones(getPhonesFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhones();
  }, []);

  return (
    <section className="phones-page">
      <ProductsPage
        products={phones}
        hasError={hasError}
        isLoading={isLoading}
        pageTitle="Mobile phones"
        productsCategory={ProductCategory.Phones}
      />
    </section>
  );
};
