import { useEffect, useState } from 'react';
import { Container } from '../shared/components/Container';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { getProducts, Product } from '../../api/products';
import { ProductsSlider } from './components/ProductsSlider';
import { CategoryGrid } from './components/CategoryGrid';

export const HomePage = () => {
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(products => {
      const sortedByYear = [...products].sort((a, b) => b.year - a.year);

      setBrandNewProducts(sortedByYear.slice(0, 10));

      const discounted = products.filter(p => p.price < p.fullPrice);

      const sortedByDiscount = [...discounted].sort((a, b) => {
        const discountA = a.fullPrice - a.price;
        const discountB = b.fullPrice - b.price;

        return discountB - discountA;
      });

      setHotPriceProducts(sortedByDiscount.slice(0, 10));
    });
  }, []);

  return (
    <Container>
      <div className={styles.page}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        <section className={styles.heroSection}>
          <h2 className={styles.heroTitle}>Welcome to Nice Gadgets store!</h2>

          <PicturesSlider />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Brand new models</h3>
          </div>

          <div className={styles.sectionContent}>
            <ProductsSlider products={brandNewProducts} showFullPrice={false} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionContent}>
            <CategoryGrid />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Hot prices</h3>
          </div>

          <div className={styles.sectionContent}>
            <ProductsSlider products={hotPriceProducts} />
          </div>
        </section>
      </div>
    </Container>
  );
};
