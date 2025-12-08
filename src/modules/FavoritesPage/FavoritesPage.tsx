import React, { useContext } from 'react';
import { FavoriteContext } from '../../shared/contexts/FavoriteContext';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';
import styles from './FavoritesPage.module.scss';
import { NavigationButton } from '../../shared/components/NavigationButton';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className={`${styles.page} container`}>
      <div className="grid-24">
        <div className={styles.headerBlock}>
          <NavigationButton title="Back" />
          <h1 className={styles.title}>Favorites</h1>
          <p className={styles.count}>{favorites.length} items</p>
        </div>

        <ProductsList products={favorites} />
      </div>
    </div>
  );
};
