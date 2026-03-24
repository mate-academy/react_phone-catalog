import { Category } from '../../components/Category/Category';
import { HotPricesSlider } from '../../components/HotPrices';
import { NewModels } from '../../components/NewModels';

import { Swipper } from '../../components/Swipper';
import styles from './HomePage.module.scss';
export const HomePage = () => {
  return (
    <div className={styles.main}>
      <h1 className={`${styles.main__title} ${styles.main__section}`}>
        Welcome to Nice Gadgets store!
      </h1>
      <section className={`${styles.main__swipper} `}>
        <Swipper />
      </section>

      <section className={styles.main__section}>
        <NewModels />
      </section>

      <section className={styles.main__section}>
        <Category />
      </section>

      <section className={styles.main__section}>
        <HotPricesSlider title="Hot prices" showDiscount={true} />
      </section>
    </div>
  );
};
