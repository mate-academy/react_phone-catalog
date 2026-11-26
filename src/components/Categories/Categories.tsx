import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import React from 'react';

interface Props {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
}

export const Categories: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__grid}>
        <Link to="/phones" className={styles.categories__card}>
          <div className={styles.categories__imgWrapper}>
            <img
              src="images/categories/categories-phones.png"
              alt="Mobile phones"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__cardTitle}>Mobile phones</h3>
          <p className={styles.categories__cardCount}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.categories__card}>
          <div className={styles.categories__imgWrapper}>
            <img
              src="images/categories/categories-tablets.png"
              alt="Tablets"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__cardTitle}>Tablets</h3>
          <p className={styles.categories__cardCount}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.categories__card}>
          <div className={styles.categories__imgWrapper}>
            <img
              src="images/categories/categories-accessories.png"
              alt="Accessories"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__cardTitle}>Accessories</h3>
          <p className={styles.categories__cardCount}>
            {accessoriesCount} models
          </p>
        </Link>
      </div>
    </section>
  );
};
