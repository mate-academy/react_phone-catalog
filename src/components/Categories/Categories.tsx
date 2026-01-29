import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <div className="container">
        <div className={styles.grid}>
          {/* Kategoria Phones */}
          <Link to="/phones" className={styles.category}>
            <div className={cn(styles.imageWrapper, styles.phonesBg)}>
              <img
                src="img/category-phones.png"
                alt="Mobile phones"
                className={styles.image}
              />
            </div>
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.count}>95 models</p>
          </Link>

          {/* Kategoria Tablets */}
          <Link to="/tablets" className={styles.category}>
            <div className={cn(styles.imageWrapper, styles.tabletsBg)}>
              <img
                src="img/category-tablets.png"
                alt="Tablets"
                className={styles.image}
              />
            </div>
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.count}>24 models</p>
          </Link>

          {/* Kategoria Accessories */}
          <Link to="/accessories" className={styles.category}>
            <div className={cn(styles.imageWrapper, styles.accessoriesBg)}>
              <img
                src="img/category-accessories.png"
                alt="Accessories"
                className={styles.image}
              />
            </div>
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <p className={styles.count}>100 models</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
