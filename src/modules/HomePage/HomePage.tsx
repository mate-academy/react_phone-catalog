import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';
import { HotPrices } from './components/HotPrices/HotPrices';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.home}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <section className={styles.section}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <PicturesSlider />
      </section>

      <section className={styles.section}>
        <BrandNewModels />
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Shop by category</h2>

        <ShopByCategory />
      </section>

      <section className={styles.section}>
        <HotPrices />
      </section>
    </main>
  );
};
