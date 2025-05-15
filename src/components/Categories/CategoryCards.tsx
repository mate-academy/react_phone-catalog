/* eslint-disable max-len */
import React from 'react';
import styles from './CategoryCards.module.scss';
import { NavLink } from 'react-router-dom';
import PhonesMobile from '../../../public/img/assets/images/shopCategory/phones-mobile.png';
import PhonesTablet from '../../../public/img/assets/images/shopCategory/phones-tablet.png';
import PhonesDesktop from '../../../public/img/assets/images/shopCategory/phones-desktop.png';

import TabletsMobile from '../../../public/img/assets/images/shopCategory/tablets-mobile.png';
import TabletsTablet from '../../../public/img/assets/images/shopCategory/tablets-tablet.png';
import TabletsDesktop from '../../../public/img/assets/images/shopCategory/tablets-desktop.png';

import AccessoriesMobile from '../../../public/img/assets/images/shopCategory/accessories-mobile.png';
import AccessoriesTablet from '../../../public/img/assets/images/shopCategory/accesories-tablet.png';
import AccessoriesDesktop from '../../../public/img/assets/images/shopCategory/accessories-desktop.png';

export const CategoryCards: React.FC = () => {
  return (
    <div className={styles.category}>
      <h3 className={styles.category__title}>Shop by category</h3>

      <div className={styles.category__cards}>
        <div className={styles.category__card}>
          <NavLink to="/phones">
            <img
              className={styles.category__image}
              src={PhonesMobile}
              alt="Category phones"
            />
          </NavLink>

          <h3 className={styles.category__cardTitle}>Mobile phones</h3>
          <p className={styles.category__cardDescription}>95 models</p>
        </div>

        <div className={styles.category__card}>
          <NavLink to="/tablets">
            <img
              src={TabletsMobile}
              className={styles.category__image}
              alt="Category tablets"
            />
          </NavLink>

          <h3 className={styles.category__cardTitle}>Tablets</h3>
          <p className={styles.category__cardDescription}>24 models</p>
        </div>

        <div className={styles.category__card}>
          <NavLink to="/accessories">
            <img
              src={AccessoriesMobile}
              className={styles.category__image}
              alt="Category accessories"
            />
          </NavLink>

          <h3 className={styles.category__cardTitle}>Accessories</h3>
          <p className={styles.category__cardDescription}>100 models</p>
        </div>
      </div>
    </div>
  );
};
