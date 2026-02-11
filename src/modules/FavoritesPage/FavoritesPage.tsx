import React from 'react';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
// eslint-disable-next-line max-len
import { useCartFavoritesContext } from '../../shared/hooks/useCartFavoritesContext';
import { getSubtitleText } from '../../shared/utils/getSubtitleText';
import { ProductList } from '../ProductPage/components/ProductList';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useCartFavoritesContext();
  const breadcrumbs = [{ name: 'Favorites', path: `/favorites` }];

  const isEmpty = favorites.length === 0;

  return (
    <div className={styles.favorites}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className={styles.favorites__titles}>
        <h1 className={styles.favorites__mainTitle}>Favorites</h1>

        <p className={styles.favorites__subtitle}>
          {getSubtitleText(favorites.length, 'No favorite products yet')}
        </p>
      </div>

      {isEmpty ? (
        <div className={styles.favorites__empty}>
          <img
            src="./img/product-not-found.png"
            alt="No products"
            className={styles.favorites__emptyImage}
          />
        </div>
      ) : (
        <ProductList products={favorites} />
      )}
    </div>
  );
};
