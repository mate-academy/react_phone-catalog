import React, { useContext } from 'react';
import styles from './shopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { ContextApp } from '../../../appContext/AppContext';
// import { NavLink } from 'react-router-dom';

export const ShopByCategory: React.FC = () => {
  const { phonesTotalNumber, tabletsTotalNumber, accessoriesTotalNumber } =
    useContext(ContextApp);
  return (
    <div className={styles['shop_by_category']}>
      <h2 className={styles['title']}>Shop By Category</h2>
      <Link to="/products" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--products']}`}
          src=".\img\banner-accessories.png"
          alt="mobile products"
        />

        <h3 className={styles['shop_by_category__section__title']}>
          Mobile products
        </h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          {phonesTotalNumber}
        </p>
      </Link>

      <Link to="/tablets" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--tablets']}`}
          src=".\img\banner-tablets.png"
          alt="tablets"
        />

        <h3 className={styles['shop_by_category__section__title']}>Tablets</h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          {tabletsTotalNumber}
        </p>
      </Link>

      <Link to="/accessories" className={styles['shop_by_category__section']}>
        <img
          className={`${styles['shop_by_category__section__picture']} ${styles['shop_by_category__section__picture--accessories']}`}
          src=".\img\banner-accessories.png"
          alt="accessories"
        />

        <h3 className={styles['shop_by_category__section__title']}>
          Accessories
        </h3>

        <p className={styles['shop_by_category__section__paragraph']}>
          {accessoriesTotalNumber}
        </p>
      </Link>
    </div>
  );
};
