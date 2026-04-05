import React, { useMemo } from 'react';
import { ProductList } from '../../components/ProductList';
import { useFavourites } from '../../context/FavouritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useCatalogParams } from '../../hooks/useCatalogParams';
import styles from './FavouritePage.module.scss';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();
  const { query } = useCatalogParams();

  const visibleFavourites = useMemo(() => {
    return favourites.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [favourites, query]);

  return (
    <div className={styles.favourites}>
      <Breadcrumbs category="favourites" />
      <h1 className={styles.favourites__title}>Favourites</h1>
      <div className={styles.favourites__quantity}>
        {visibleFavourites.length}{' '}
        {visibleFavourites.length === 1 ? 'item' : 'items'}
      </div>

      {favourites.length > 0 ? (
        <div className={styles.favourites__products}>
          <ProductList products={visibleFavourites} />
        </div>
      ) : (
        <h2 className={styles.favourites__empty}>
          Your favourites list is empty.
        </h2>
      )}
    </div>
  );
};
