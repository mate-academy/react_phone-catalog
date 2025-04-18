import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './CurrentPage.module.scss';

import { getPageTitle } from '../../utils/getPageTitle';
import { AllProducts } from '../../types/AllProducts/AllProducts';

type Props = {
  products: AllProducts[];
};

export const CurrentPage: React.FC<Props> = ({ products }) => {
  const { pathname } = useLocation();
  const normalizedPathName = pathname.replace('/', '');

  const title = getPageTitle(normalizedPathName);

  return (
    <div className={styles.productPage__location}>
      <div className={styles.productPage__wrapper}>
        <a href="#" className={styles.productPage__homeLink}>
          <img
            loading="lazy"
            src="src/assets/images/productPage/home-icon.svg"
            alt="Іконка домашньої сторінки"
            className={styles.productPage__homeimg}
          />
        </a>

        <div className={styles.productPage__currentLocation}>
          <img
            src="src/assets/images/productPage/home-arrow.svg"
            alt="Стрілка поточної сторінки"
            loading="lazy"
            className={styles.productPage__arrow}
          />
          <a href="#" className={styles.productPage__currentTitle}>
            Phones
          </a>
        </div>
      </div>
      <h1 className={styles.productPage__productTitle}>{title}</h1>
      <p className={styles.productPage__items}>{`${products.length} models`}</p>
    </div>
  );
};
