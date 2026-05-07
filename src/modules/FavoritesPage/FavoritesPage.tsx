import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectFavoritesItems } from '../../features/favorites/favoritesSlice';
import { ProductList } from '../../components/ProductList/ProductList';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { productMatchesQuery } from '../../utils/productSearch';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(selectFavoritesItems);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const visibleFavorites = query
    ? favorites.filter(product => productMatchesQuery(product, query))
    : favorites;

  return (
    <section className={styles.favoritesPage}>
      <BreadCrumbs
        overrideCrumbs={[{ label: 'Home', to: '/' }, { label: 'Favourites' }]}
      />

      <h1 className={styles.favoritesPage__title}>Favourites</h1>
      <p className={styles.favoritesPage__count}>
        {favorites.length} item{favorites.length === 1 ? '' : 's'}
      </p>

      {favorites.length === 0 ? (
        <p className={styles.favoritesPage__empty}>Favorites is empty</p>
      ) : visibleFavorites.length === 0 ? (
        <p className={styles.favoritesPage__empty}>
          There are no products matching the query.
        </p>
      ) : (
        <ProductList products={visibleFavorites} />
      )}
    </section>
  );
};
