import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../shared/components/Loader/Loader';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ShopByCategory } from '../shared/components/ShopByCategory';
import { getProducts } from '../shared/services/api';
import { Product } from '../shared/types/Product';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  // Brand new: mais novos segundo o campo year
  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.year - a.year || b.price - a.price)
      .slice(0, 12);
  }, [products]);

  // Hot prices: maior desconto em valor absoluto (fullPrice - price)
  const hotPriceProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 12);
  }, [products]);

  return (
    <div className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <p className={styles.home__title}>Welcome to Nice Gadgets store!</p>

      <PicturesSlider />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
            showFullPrice={false}
          />

          <ShopByCategory products={products} />

          <ProductsSlider
            title="Hot prices"
            products={hotPriceProducts}
            showFullPrice={true}
          />
        </>
      )}
    </div>
  );
};
