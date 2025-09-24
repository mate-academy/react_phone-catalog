/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './FavouritesPage.module.scss';
import { StoreContext } from '../../StoreProvider';
import { BackButton } from '../ProductDetailsPage/BackButton';
import { FavouritesList } from './FavouritesList';
import { Breadcrumbs } from '../Breadcrumbs';

export const FavouritesPage = () => {
  const { favourites } = useContext(StoreContext);

  return (
    <div className={styles.container}>
      <Breadcrumbs categoryTitle={'Favourites'} />
      <div className={styles.upper}>
        <div className={styles.back}>
          <BackButton />
        </div>

        <h1 className={styles.title}>Favourites</h1>
        <span className={styles.quantity}>{favourites.length} items</span>
      </div>

      {favourites.length === 0 ? (
        <h2 className={styles.message}>{`You don't have any favourites...`}</h2>
      ) : (
        <div className={styles.cartlist}>
          <FavouritesList />
        </div>
      )}
    </div>
  );
};
