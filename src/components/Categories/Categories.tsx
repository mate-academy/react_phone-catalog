import React from 'react';
import { Link } from 'react-router-dom';
import { normalizePath } from '../../api/products';
import styles from './Categories.module.scss';

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
          <div
            className={`${styles.categories__imageWrapper} ${styles['categories__imageWrapper--phones']}`}
          >
            <img
              src={normalizePath('img/category-phones.png')}
              alt="Mobile phones"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__name}>Mobile phones</h3>
          <span className={styles.categories__count}>{phonesCount} models</span>
        </Link>

        <Link to="/tablets" className={styles.categories__card}>
          <div
            className={`${styles.categories__imageWrapper} ${styles['categories__imageWrapper--tablets']}`}
          >
            <img
              src={normalizePath('img/category-tablets.png')}
              alt="Tablets"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__name}>Tablets</h3>
          <span className={styles.categories__count}>
            {tabletsCount} models
          </span>
        </Link>

        <Link to="/accessories" className={styles.categories__card}>
          <div
            className={`${styles.categories__imageWrapper} ${styles['categories__imageWrapper--accessories']}`}
          >
            <img
              src={normalizePath('img/category-accessories.png')}
              alt="Accessories"
              className={styles.categories__image}
            />
          </div>
          <h3 className={styles.categories__name}>Accessories</h3>
          <span className={styles.categories__count}>
            {accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
