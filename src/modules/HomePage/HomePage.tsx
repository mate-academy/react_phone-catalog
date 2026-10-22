import styles from './HomePage.module.scss';

import { Hero } from './components/Hero/Hero';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';
import { Slider } from '../../components/Slider/Slider';

import { useProducts } from '../../shared/context/ProductsContext';
import { WithLoader } from '../../components/WithLoader';

export const HomePage = () => {
  const { products, loading, error } = useProducts();

  const brandNew = [...products].sort((a, b) => b.year - a.year);

  const hotPrices = [...products].sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <WithLoader loading={loading} error={error ? String(error) : null}>
      <>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>

        {/* Page title */}
        <h1 className={styles.pageTitle}>Welcome to Nice Gadgets store!</h1>

        {/* Hero section */}
        <section className={styles.section}>
          <Hero />
        </section>

        {/* Brand new models */}
        <section className={styles.section}>
          <Slider
            title="Brand new models"
            products={brandNew}
            showDiscount={false}
          />
        </section>

        {/* Shop by category */}
        <section className={styles.section}>
          <ShopByCategory />
        </section>

        {/* Hot prices */}
        <section className={styles.section}>
          <Slider title="Hot prices" products={hotPrices} showDiscount={true} />
        </section>
      </>
    </WithLoader>
  );
};
