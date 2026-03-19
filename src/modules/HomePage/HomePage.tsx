import React, { useMemo } from 'react';
import styles from './HomePage.module.scss';
import { useProducts } from '@/context/ProductsContext';
import { ProductSlider } from '../shared/components/ProductSlider';
import { Loader } from '@/components/Loader';
import { ShopByCategory } from './components/ShopByCategory';
import { HeroSlider } from './components/HeroSlider';
import { Heading } from '@/components/ui/Heading';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.year - a.year)
      .slice(0, 24)
      .map(product => ({
        ...product,
        fullPrice: product.price,
      }));
  }, [products]);

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
          <Heading as="h1">Welcome to Nice Gadgets store!</Heading>
          <HeroSlider />
          <section className={styles.home__section}></section>

          <section className={styles.home__section}>
            <ProductSlider
              title="Brand new models"
              products={brandNewProducts}
            />
          </section>

          <ShopByCategory />

          {hotPriceProducts.length > 0 && (
            <section className={styles.home__section}>
              <ProductSlider title="Hot prices" products={hotPriceProducts} />
            </section>
          )}
        </>
      </div>
    </div>
  );
};
