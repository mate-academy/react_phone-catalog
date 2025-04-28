import styles from './FavouritesProducts.module.scss';
import { StateContext } from '../../hooks/SelectionState';
import { ProductNav } from '../../ProductNav';
import { GridFavourites } from '../GridFavourites';
import { useContext } from 'react';

export const FavouritesProducts = () => {
  const { favourites } = useContext(StateContext);

  return (
    <section className={styles['favourites-product']}>
      <ProductNav />
      <h1 className={styles['favourites-product__title']}>Favourites</h1>

      {favourites.length ? (
        <>
          <p className={styles['favourites-product__text']}>
            {favourites.length} item{favourites.length === 1 ? '' : 's'}
          </p>
          <GridFavourites products={favourites} />
        </>
      ) : (
        <p className={styles['favourites-product__text']}>No items</p>
      )}
    </section>
  );
};
