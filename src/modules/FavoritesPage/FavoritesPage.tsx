/* eslint-disable import/extensions */
import React from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import styles from './FavoritesPage.module.scss';
import classNames from 'classnames';
import { ProductsList } from '../shared/components/ProductsList';
import { useProducts } from '@/hooks/useProducts';

export const FavoritePage: React.FC = () => {
  const { favorites } = useProducts();

  return (
    <main className={classNames('container', styles.favorites_page)}>
      <Breadcrumbs links={['Favorites']}></Breadcrumbs>
      <div className={styles.favorites_page__text}>
        <h1>Favorites</h1>
        <p className={classNames('text__body', styles.favorites_page__qty)}>
          {favorites.length} items
        </p>
      </div>
      <div className={styles.favorites_page__products}>
        {favorites.length === 0 ? (
          <h4 className={styles['favorite_page__products--note']}>
            Your favorite items will appear here
          </h4>
        ) : (
          <ProductsList products={favorites}></ProductsList>
        )}
      </div>
    </main>
  );
};
