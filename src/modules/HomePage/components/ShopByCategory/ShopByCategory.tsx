import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__list}>
        <Link
          to="/phones"
          className={`${styles.categories__item} ${styles['categories__item--phones']}`}
        >
          <div className={styles['categories__image-container']}>
            <img
              className={styles.categories__image}
              src={`${import.meta.env.BASE_URL}/img/categories/category-phones.png`}
              alt="phones-category"
            />
          </div>
          <h3 className={styles.categorie__title}>Mobile phones</h3>
          <p className={styles.categories__count}>95 models</p>
        </Link>

        <Link
          to="/tablets"
          className={`${styles.categories__item} ${styles['categories__item--tablets']}`}
        >
          <div className={styles['categories__image-container']}>
            <img
              className={styles.categories__image}
              src={`${import.meta.env.BASE_URL}/img/categories/category-tablets.png`}
               alt="tablets-category"
            />
          </div>
          <h3 className={styles.categorie__title}>Tablets</h3>
          <p className={styles.categories__count}>24 models</p>
        </Link>

        <Link
          to="/accessories"
          className={`${styles.categories__item} ${styles['categories__item--accessories']}`}
        >
          <div className={styles['categories__image-container']}>
            <img
              className={styles.categories__image}
              src={`${import.meta.env.BASE_URL}/img/categories/category-accessories.png`}
               alt="accessories-category"
            />
          </div>
          <h3 className={styles.categorie__title}>Accessories</h3>
          <p className={styles.categories__count}>100 models</p>
        </Link>
      </div>
    </div>
  );
};
