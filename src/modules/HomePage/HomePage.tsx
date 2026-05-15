import React, { useMemo } from 'react';
import { useFetchProducts } from '../../features/products/useFetchProducts';
import { getBrandNewModels } from '../shared/helpers/brandNewModels';
import { Loader } from '../../components/Loader';
import { HomeBannerSlider } from './components/HomeBannerSlider';
import { ProductSlider } from '../../components/ProductSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { products, isLoading, error } = useFetchProducts();

  const brandNew = useMemo(() => getBrandNewModels(products, 8), [products]);
  const hotPrices = useMemo(
    () =>
      products
        .filter(p => p.fullPrice !== undefined && p.fullPrice > p.price)
        .sort((a, b) => {
          const discountA = (a.fullPrice || 0) - a.price;
          const discountB = (b.fullPrice || 0) - b.price;

          return discountB - discountA;
        })
        .slice(0, 8),
    [products],
  );

  return (
    <div className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      {isLoading && <Loader />}

      {!isLoading && error && <div className={styles.error}>{error}</div>}

      {!isLoading && !error && (
        <>
          <h2 className={styles.homeTitle}>Welcome to Nice Gadgets store!</h2>

          <section>
            <HomeBannerSlider />
          </section>

          <section>
            <ProductSlider title="Brand new models" products={brandNew} hideDiscount />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shop by category</h2>
            <ShopByCategory />
          </section>

          <section>
            <ProductSlider title="Hot Prices" products={hotPrices} />
          </section>
        </>
      )}
    </div>
  );
};
