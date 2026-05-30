import React, { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { useProducts } from '@/context/ProductsContext';
import { ProductSlider } from '../shared/components/ProductSlider';
import { Loader } from '@/components/Loader';
import { ShopByCategory } from './components/ShopByCategory';
import { HeroSlider } from './components/HeroSlider';
import { Heading } from '@/modules/shared/ui/Heading';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { t } = useTranslation();

  // --- COMPUTED DATA (New Arrivals) ---
  // Filters and sorts products by year to show the latest models
  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.year - a.year)
      .slice(0, 24)
      .map(product => ({
        ...product,
        fullPrice: product.price,
      }));
  }, [products]);

  // --- COMPUTED DATA (Deals/Discounts) ---
  // Filters products where the original price is higher than current price
  const hotPriceProducts = useMemo(() => {
    return [...products]
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      })
      .slice(0, 24);
  }, [products]);

  // --- ERROR & LOADING STATES ---
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.home}>
      <div className="container">
        <>
          <Heading as="h1" className={styles.topHeading}>
            {t('home.welcome')}
          </Heading>

          <section className={styles.home__section}>
            <HeroSlider />
          </section>

          <section className={styles.home__section}>
            <ProductSlider title="home.newModels" products={brandNewProducts} />
          </section>

          <section className={styles.home__section}>
            <ShopByCategory />
          </section>

          {hotPriceProducts.length > 0 && (
            <section className={styles.home__section}>
              <ProductSlider
                title="home.hotPrices"
                products={hotPriceProducts}
              />
            </section>
          )}
        </>
      </div>
    </div>
  );
};
