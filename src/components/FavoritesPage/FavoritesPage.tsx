import React, { useContext } from 'react';
import styles from './FavoritesPage.module.scss';

import { TopPage } from '../TopPage';
import { FavContext } from '../../contexts/favorites';
import { ProductsList } from '../ProductsList/ProductsList';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(FavContext);

  return (
    <div className={styles.favorites}>
      <TopPage title="Favorites" products={favorites} category="favorites" />

      <ProductsList products={favorites} category="products" />
    </div>
  );
};
