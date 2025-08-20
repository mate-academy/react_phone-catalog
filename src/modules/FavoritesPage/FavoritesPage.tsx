import React from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavoritesPage.module.scss';
import classNames from 'classnames';

export const FavoritePage: React.FC = () => {
  return (
    <main className={classNames('container', styles.favorites_page)}>
      <Breadcrumbs links={['Favorites']}></Breadcrumbs>
      <div className={styles.favorites_page__text}>
        <h1>Favorites</h1>
        <p className={classNames('text__body', styles.favorites_page__qty)}>
          5 items
        </p>
      </div>
      <div className={styles.favorites_page__products}>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </main>
  );
};
