import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useProducts } from '../../hooks/useProducts';

export const ShopByCategory = () => {
  const { categoryCounts } = useProducts('phones');

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.categorySection__title}>Shop by category</h2>

      <div className={styles.categorySection__list}>
        <Link to="/phones" className={styles.categoryCard}>
          <div
            className={`${styles.categoryCard__background} ${styles['background--phones']}`}
          >
            <img
              src="./img/category-phones.webp"
              alt="Mobile phones"
              className={styles.categoryCard__image}
            />
          </div>
          <h3 className={styles.categoryCard__title}>Mobile phones</h3>
          <p className={styles.categoryCard__count}>
            {`${categoryCounts.phones} models`}
          </p>
        </Link>

        <Link to="/tablets" className={styles.categoryCard}>
          <div
            className={`${styles.categoryCard__background} ${styles['background--tablets']}`}
          >
            <img
              src="./img/category-tablets.webp"
              alt="Tablets"
              className={styles.categoryCard__image}
            />
          </div>
          <h3 className={styles.categoryCard__title}>Tablets</h3>
          <p className={styles.categoryCard__count}>
            {`${categoryCounts.tablets} models`}
          </p>
        </Link>

        <Link to="/accessories" className={styles.categoryCard}>
          <div
            className={`${styles.categoryCard__background} ${styles['background--accessories']}`}
          >
            <img
              src="./img/category-accessories.webp"
              alt="Accessories"
              className={styles.categoryCard__image}
            />
          </div>
          <h3 className={styles.categoryCard__title}>Accessories</h3>
          <p className={styles.categoryCard__count}>
            {`${categoryCounts.accessories} models`}
          </p>
        </Link>
      </div>
    </section>
  );
};
