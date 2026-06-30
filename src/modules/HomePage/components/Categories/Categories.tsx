import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <div className={styles.categories__header}>
        <h2 className={styles.categories__title}>Shop by category</h2>
      </div>

      <div className={styles.categories__grid}>
        <Link to="/phones" className={styles.categoryItem}>
          <div className={styles.categoryItem__imageWrapper}>
            <img
              src="/img/category-phones.png"
              alt="Mobile phones"
              className={styles.categoryItem__image}
            />
          </div>
          <h3 className={styles.categoryItem__title}>Mobile phones</h3>
          <p className={styles.categoryItem__count}>95 models</p>
        </Link>

        <Link to="/tablets" className={styles.categoryItem}>
          <div className={styles.categoryItem__imageWrapper}>
            <img
              src="/img/category-tablets.png"
              alt="Tablets"
              className={styles.categoryItem__image}
            />
          </div>
          <h3 className={styles.categoryItem__title}>Tablets</h3>
          <p className={styles.categoryItem__count}>24 models</p>
        </Link>

        <Link to="/accessories" className={styles.categoryItem}>
          <div className={styles.categoryItem__imageWrapper}>
            <img
              src="/img/category-accessories.png"
              alt="Accessories"
              className={styles.categoryItem__image}
            />
          </div>
          <h3 className={styles.categoryItem__title}>Accessories</h3>
          <p className={styles.categoryItem__count}>100 models</p>
        </Link>
      </div>
    </div>
  );
};
