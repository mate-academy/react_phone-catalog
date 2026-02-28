import React, { useEffect, useState } from 'react';

import styles from './HomePage.module.scss';
import { Hero } from './Hero';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrices } from '../../components/HotPrices';
import { CatalogProducts } from '../../types/ProductTypes';
import { getProducts } from '../../api/products';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<CatalogProducts[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setErrorMessage('Something went wrong while fetching products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const brandNewProducts = [...products].sort(
    (item1, item2) => item2.year - item1.year,
  );

  const hotPricesProducts = [...products].sort((item1, item2) => {
    const discount1 = item1.fullPrice - item1.price;
    const discount2 = item2.fullPrice - item2.price;

    return discount2 - discount1;
  });

  return (
    <div className={styles.home__container}>
      <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
      <Hero />
      {isloading && <p>Loading products...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <ProductsSlider title="Brand new models" products={brandNewProducts} />
      <ShopByCategory />
      <HotPrices title="Hot Prices" products={hotPricesProducts} />
    </div>
  );
};
