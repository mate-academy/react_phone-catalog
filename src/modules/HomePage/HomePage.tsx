import { useMemo } from 'react';

import { useProducts } from '../shared/context/ProductsContext';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductSlider } from './components/ProductSlider';
import { ShopByCategory } from './components/ShopByCategory';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, error } = useProducts();

  const newProducts = useMemo(() => {
    return [...products].sort((p1, p2) => p2.year - p1.year).slice(0, 10);
  }, [products]);

  const bestDiscountProducts = useMemo(() => {
    return [...products]
      .sort((p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price))
      .slice(0, 10);
  }, [products]);

  return (
    <div className={styles.home}>
      <div className={styles.home__wrapper}>
        <h1 className={styles['home__visually-hidden']}>Product Catalog</h1>

        <p className={styles.home__title}>Welcome to Nice Gadgets store!</p>

        <div className={styles.home__main}>
          <PicturesSlider />

          {products.length > 0 && !error && (
            <ProductSlider products={newProducts} header="Brand new models" />
          )}

          <ShopByCategory />

          {products.length > 0 && !error && (
            <ProductSlider
              products={bestDiscountProducts}
              header="Hot prices"
            />
          )}
        </div>
      </div>
    </div>
  );
};
