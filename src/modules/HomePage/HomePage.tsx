import React from 'react';

import '@/styles/main.scss';
import { ProductCarousel } from '../shared/components/ProductCarousel';
import { PromoCarousel } from './PromoCarousel/PromoCarousel';
import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { Categories } from './CategoryCarousel';

export const HomePage: React.FC = () => {
  return (
    <main className={classNames(styles.home_page, 'container')}>
      <h1 className={styles.home_page__heading}>
        Welcome to Nice Gadgets store!
      </h1>
      <PromoCarousel></PromoCarousel>
      <ProductCarousel title={'Brand new products'}></ProductCarousel>
      <Categories></Categories>
    </main>
  );
};
