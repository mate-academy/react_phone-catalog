import React, { useEffect, useMemo, useState } from 'react';
import { Hero } from './Hero';
import { ProductSlider } from '../../components/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { HotPrices } from '../../components/HotPrices';
import { CatalogProducts } from '../../types/Types';
import { getProducts } from '../../api/product';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<CatalogProducts[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setErrorMessage('Something went wrong while fetching products.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const brandNewProducts = useMemo(
    () =>
      [...products]
        .sort((item1, item2) => item2.year - item1.year)
        .map(item => ({ ...item, fullPrice: item.price })),
    [products],
  );

  const hotPricesProducts = useMemo(
    () =>
      [...products].sort(
        (item1, item2) =>
          item2.fullPrice - item2.price - (item1.fullPrice - item1.price),
      ),
    [products],
  );

  return (
    <div className={styles.home__container}>
      <h1 className={styles.title__hidden}>Product Catalog</h1>
      <h2 className={styles.home__title}>Welcome to Nice Gadgets store!</h2>
      <Hero />
      {isLoading && <p>Loading products...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <ProductSlider title="Brand New models" products={brandNewProducts} />
      <ShopByCategory />
      <HotPrices title="Hot Prices" products={hotPricesProducts} />
    </div>
  );
};
