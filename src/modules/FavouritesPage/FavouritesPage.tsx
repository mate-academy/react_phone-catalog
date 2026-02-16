import React from 'react';
import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { useCartState } from '../../contexts/CartContext';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavouritesPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const { favorites, favCount } = useCartState();

  return (
    <section className={styles.favourites}>
      <div className={styles.container}>
        <Breadcrumbs pathnames={pathnames} />
        <h1 className={styles.favourites__title}>Favourites</h1>

        {favCount > 0 ? (
          <>
            <span className={styles.favourites__totalItems}>
              {favCount} items
            </span>

            <ProductsList products={favorites} />
          </>
        ) : (
          <p className={styles.favourites__empty}>Your favorites is empty.</p>
        )}
      </div>
    </section>
  );
};
