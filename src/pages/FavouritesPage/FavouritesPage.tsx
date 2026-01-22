import React from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useFav } from '../../context/FavContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favItems } = useFav();

  return (
    <div className={styles.favouritesPage}>
      <div className="container">
        <Breadcrumbs />

        <header className={styles.header}>
          <h1 className={styles.title}>Favourites</h1>
          <p className={styles.count}>{favItems.length} items</p>
        </header>

        {favItems.length > 0 ? (
          <ProductsList products={favItems} />
        ) : (
          <div className={styles.empty}>
            <p>You have no favorite items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
