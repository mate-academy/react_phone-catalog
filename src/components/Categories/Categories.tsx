import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  const { products } = useAppContext();

  return (
    <section className={styles.section}>
      <h2>Shop by categoty</h2>

      <div className={styles.wrapper}>
        <Link
          to="/phones"
          className={`${styles.category}`}
        >
          <div className={`${styles.banner} ${styles.bannerPhones}`}></div>

          <div className={styles.details}>
            <h4 className={styles.title}>Mobile phones</h4>
            <span className={`${styles.counter} bodyText`}>{products.filter(product => product.category === 'phones').length} models</span>
          </div>
        </Link>

        <Link
          to="/tablets"
          className={`${styles.category}`}
        >
          <div className={`${styles.banner} ${styles.bannerTablets}`}></div>

          <div className={styles.details}>
            <h4 className={styles.title}>Tablets</h4>
            <span className={`${styles.counter} bodyText`}>{products.filter(product => product.category === 'tablets').length} models</span>
          </div>
        </Link>

        <Link
          to="/accessories"
          className={`${styles.category}`}
        >
          <div className={`${styles.banner} ${styles.bannerAccessories}`}></div>

          <div className={styles.details}>
            <h4 className={styles.title}>Accessories</h4>
            <span className={`${styles.counter} bodyText`}>{products.filter(product => product.category === 'accessories').length} models</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
