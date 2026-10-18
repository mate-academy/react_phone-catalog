import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';

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
        <h2 className={styles.title}>Brand new models</h2>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Shop by category</h2>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Hot prices</h2>
      </section>
    </main>
  );
};
