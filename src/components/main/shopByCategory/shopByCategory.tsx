import React from 'react';
import styles from './shopByCategory.module.scss';
// import { NavLink } from 'react-router-dom';

export const ShopByCategory: React.FC = () => {
  return (
    <div className={styles['shop_by_category']}>
      <h2 className={styles['shop_by_category__title']}>shopByCategory</h2>
      <a href="/phones" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--phones']}`}
          src=".\img\banner-phones.png"
          alt="mobile phones"
        />

        <h3 className={styles['shop_by_category__section__title']}>
          Mobile phones
        </h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          ile wyciagnij z context
        </p>
      </a>

      <a href="/tablets" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--tablets']}`}
          src=".\img\banner-tablets.png"
          alt="tablets"
        />

        <h3 className={styles['shop_by_category__section__title']}>Tablets</h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          ile wyciagnij z context
        </p>
      </a>

      <a href="/accessories" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--accessories']}`}
          src=".\img\banner-accessories.png"
          alt="accessories"
        />

        <h3 className={styles['shop_by_category__section__title']}>
          Accessories
        </h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          ile wyciagnij z context
        </p>
      </a>
    </div>
  );
};
