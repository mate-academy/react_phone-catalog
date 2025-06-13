import React from 'react';
import styles from './FavouritesPage.module.scss';
import { ProductItem } from '../shared/ProductItem/ProductItem';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useFavourites } from '../../hooks/useFavourites';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const favouritesQuantities = favourites.length;

  return (
    <main className={styles.main}>
      <Breadcrumbs category="favourites" />
      <h2 className={styles.main__title}>Favourites</h2>
      <p className={styles.main__text}>{`${favouritesQuantities} models`}</p>
      <div className={styles.wrapper}>
        {favourites.map(product => (
          <ProductItem key={product.itemId} item={product} isHot={true} />
        ))}
      </div>
    </main>
  );
};
