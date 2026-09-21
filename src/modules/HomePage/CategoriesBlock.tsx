import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoriesBlock.module.scss';

interface Props {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
}

export const CategoriesBlock: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <Link to="/phones" className={styles.card}>
          <div className={`${styles.imageBox} ${styles.phonesBg}`}>
            <img
              src="./img/category-phones.webp"
              alt="Mobile phones"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryTitle}>Mobile phones</h3>
          <p className={styles.count}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.card}>
          <div className={`${styles.imageBox} ${styles.tabletsBg}`}>
            <img
              src="./img/category-tablets.webp"
              alt="Tablets"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryTitle}>Tablets</h3>
          <p className={styles.count}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.card}>
          <div className={`${styles.imageBox} ${styles.accessoriesBg}`}>
            <img
              src="./img/category-accessories.webp"
              alt="Accessories"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryTitle}>Accessories</h3>
          <p className={styles.count}>{accessoriesCount} models</p>
        </Link>
      </div>
    </section>
  );
};
