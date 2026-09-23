import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useStore();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visibleFavorites = useMemo(() => {
    if (!query.trim()) {
      return favorites;
    }

    return favorites.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }, [favorites, query]);

  return (
    <div className={styles.favorites} data-cy="FavoritesPage">
      <div className={styles.favorites__breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.favorites__title}>Favorites</h1>

      <p className={styles.favorites__count}>
        {visibleFavorites.length}{' '}
        {visibleFavorites.length === 1 ? 'item' : 'items'}
      </p>

      {favorites.length === 0 ? (
        <p className={styles.favorites__empty}>Your favorites list is empty</p>
      ) : visibleFavorites.length === 0 ? (
        <p className={styles.favorites__empty}>
          There are no favorites matching the query
        </p>
      ) : (
        <ProductsList products={visibleFavorites} />
      )}
    </div>
  );
};
