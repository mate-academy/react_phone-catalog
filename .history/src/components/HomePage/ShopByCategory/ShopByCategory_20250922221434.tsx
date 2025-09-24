/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './ShopByCategory.module.scss';

import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsProvider';

export const ShopByCategory = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Shop by category</h2>
        <NavLink
          to="/phones"
          className={styles.category}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            className={styles.phonephoto}
            src="public/img/category-phones.webp"
            alt="Gadget image"
          />
          <h3 className={styles.name}>Mobile phones</h3>
          <span className={styles.quantity}>{`${phones.length} models`}</span>
        </NavLink>

        <NavLink
          to="/tablets"
          className={styles.category}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            className={styles.tabletphoto}
            src="public/img/category-tablets.webp"
            alt="Gadget image"
          />
          <h3 className={styles.name}>Tablets</h3>
          <span className={styles.quantity}>{`${tablets.length} models`}</span>
        </NavLink>

        <NavLink
          to="/accessories"
          className={styles.category}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            className={styles.accessoryphoto}
            src="public/img/category-accessories.webp"
            alt="Gadget image"
          />
          <h3 className={styles.name}>Accessories</h3>
          <span className={styles.quantity}>{`${accessories.length} models`}</span>
        </NavLink>
      </div>
    </>
  );
};
