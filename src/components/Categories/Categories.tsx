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
          <div className={`${styles.banner} ${styles.bannerPhones}`}>
            {/* <img
              className={`${styles.img} ${styles.imgPhones}`}
              src="/img/category-phones.webp"
              alt="Phones category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Mobile phones</h4>
            <span className="bodyText">{products.filter(product => product.category === 'phones').length} models</span>
          </div>
        </Link>

        <Link
          to="/tablets"
          className={`${styles.category}`}
        >
          <div className={`${styles.banner} ${styles.bannerTablets}`}>
            {/* <img
              className={`${styles.img} ${styles.imgTablets}`}
              src="/img/category-tablets.png"
              alt="Tablets category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Tablets</h4>
            <span className="bodyText">{products.filter(product => product.category === 'tablets').length} models</span>
          </div>
        </Link>

        <Link
          to="/accessories"
          className={`${styles.category}`}
        >
          <div className={`${styles.banner} ${styles.bannerAccessories}`}>
            {/* <img
              className={`${styles.img} ${styles.imgAccessories}`}
              src="/img/category-accessories.png"
              alt="Accessories category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Accessories</h4>
            <span className="bodyText">{products.filter(product => product.category === 'accessories').length} models</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
