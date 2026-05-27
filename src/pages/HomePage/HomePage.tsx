import { Banner } from '../../components/Banner/Banner';
import { HotPrices } from '../../components/HotPrices/HotPrices';
import { NewModels } from '../../components/NewModels/NewModels';
import { Category } from '../../components/Shop-by-category/Сategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.main__title}>Product Catalog</h1>

      <section className={styles.main__banner}>
        <Banner />
      </section>

      <section className={styles.main__newModels}>
        <NewModels />
      </section>

      <section className={`${styles.main__category} ${styles.container}`}>
        <Category />
      </section>

      <section className={styles.main__hotPrices}>
        <HotPrices />
      </section>
    </div>
  );
};
