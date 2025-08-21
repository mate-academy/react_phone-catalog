import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AllItemsList } from '../../components/AllItemsList';
import { useFavorites } from '../../context/Favorites/FavoritesContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <Breadcrumbs />
      <div className={styles['title']}>
        <h1 className={styles['title__name']}>Favourites</h1>
        <p className={styles['title__quantity']}>{favorites.length} models</p>
      </div>

      <AllItemsList allItems={favorites} useFilters={false} />
    </div>
  );
};
