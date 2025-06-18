/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
  selectFavoriteItems,
  selectFavoritesQuantity,
} from '../../features/favorites/favorites.selectors';
import { ProductCard } from '../../shared/components/layout/ProductCard';
import { Breadcrumbs } from '../../shared/components/ui/Breadcrumbs';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const favoritesItems = useSelector(selectFavoriteItems);
  const favoritesQuantity = useSelector(selectFavoritesQuantity);

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.title}>Favorites</h1>

      <span
        className={styles.numOfProducts}
      >{`${favoritesQuantity} items`}</span>

      {favoritesQuantity === 0 ? (
        <div className={styles.notFoundProducts}>
          <h1 className={styles.notFoundMessage}>
            Start exploring and add your first favorite product!
          </h1>

          <Link className={styles.link} to="/">
            <button className={styles.button} type="button">
              Go to explore
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.productsList}>
          {favoritesItems.map(product => (
            <div key={product.id}>
              <ProductCard product={product} showDiscount={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
