import { NavLink } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';
import { Device } from '../../types';
import React from 'react';
import { getDevicesFromCategory } from '../../hooks/utilHooks';

interface ShopByCategoryProps {
  devicesFromAPI: Device[];
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  devicesFromAPI,
}) => {
  const numberOfPhones = getDevicesFromCategory(devicesFromAPI, 'phones');
  const numberOfTablets = getDevicesFromCategory(devicesFromAPI, 'tablets');
  const numberOfAccessories = getDevicesFromCategory(
    devicesFromAPI,
    'accessories',
  );

  return (
    <div className={styles.shopByCategory__Container}>
      <h1 className={styles.shopByCategory__headerTitle}>Shop by category</h1>
      <div className={styles.sectionsContainer}>
        <NavLink
          to="/catalog/phones"
          className={styles.shopByCategory__ImageContainer}
        >
          <img
            src="img/new/Phones.svg"
            className={styles.shopByCategory__Image}
          />
          <div className={styles.shopByCategory__SectionText}>
            <h3 className={styles.shopByCategory__SectionTitle}>
              Mobile phones
            </h3>
            <p className={styles.shopByCategory__SectionParagraph}>
              {numberOfPhones} models
            </p>
          </div>
        </NavLink>
        <NavLink
          to="/catalog/tablets"
          className={styles.shopByCategory__ImageContainer}
        >
          <img
            src="img/new/Tablets.svg"
            className={styles.shopByCategory__Image}
          />
          <div className={styles.shopByCategory__SectionText}>
            <h3 className={styles.shopByCategory__SectionTitle}>Tablets</h3>
            <p className={styles.shopByCategory__SectionParagraph}>
              {numberOfTablets} models
            </p>
          </div>
        </NavLink>
        <NavLink
          to="/catalog/accessories"
          className={styles.shopByCategory__ImageContainer}
        >
          <img
            src="img/new/Accessories.svg"
            className={styles.shopByCategory__Image}
          />
          <div className={styles.shopByCategory__SectionText}>
            <h3 className={styles.shopByCategory__SectionTitle}>Accessories</h3>
            <p className={styles.shopByCategory__SectionParagraph}>
              {numberOfAccessories} models
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
