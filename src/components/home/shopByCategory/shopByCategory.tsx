import React, { useContext } from 'react';
import Styles from './shopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { ContextApp } from '../../../appContext/AppContext';

export const ShopByCategory: React.FC = () => {
  const { phonesTotalNumber, tabletsTotalNumber, accessoriesTotalNumber } =
    useContext(ContextApp);
  return (
    <div className={Styles.shop_by_category}>
      <h2 className={Styles.title}>Shop By Category</h2>

      <Link to="/phones" className={Styles.shop_by_category__section}>
        <img
          className={Styles.shop_by_category__section__picture}
          src=".\img\category-phones.webp"
          alt="mobile products"
        />

        <h3 className={Styles.shop_by_category__section__title}>
          Mobile products
        </h3>

        <p className={Styles.shop_by_category__section__paragraph}>
          {phonesTotalNumber}
        </p>
      </Link>

      <Link to="/tablets" className={Styles.shop_by_category__section}>
        <img
          className={Styles.shop_by_category__section__picture}
          src=".\img\category-tablets.webp"
          alt="tablets"
        />

        <h3 className={Styles.shop_by_category__section__title}>Tablets</h3>

        <p className={Styles.shop_by_category__section__paragraph}>
          {tabletsTotalNumber}
        </p>
      </Link>

      <Link to="/accessories" className={Styles.shop_by_category__section}>
        <img
          className={Styles.shop_by_category__section__picture}
          src=".\img\category-accessories.webp"
          alt="accessories"
        />

        <h3 className={Styles.shop_by_category__section__title}>Accessories</h3>

        <p className={Styles.shop_by_category__section__paragraph}>
          {accessoriesTotalNumber}
        </p>
      </Link>
    </div>
  );
};
