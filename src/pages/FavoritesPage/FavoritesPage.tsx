import { useSearchParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { matchesQuery } from '../../utils/matchesQuery';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useStore();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').trim().toLowerCase();

  const visibleFavorites = favorites.filter(p => matchesQuery(p.name, query));

  return (
    <div className={styles.favorites} data-cy="FavoritesPage">
      <Breadcrumbs />

      <h1 className={styles.favorites__title}>Favorites</h1>

      <p className={styles.favorites__count}>
        {visibleFavorites.length}{' '}
        {visibleFavorites.length === 1 ? 'item' : 'items'}
      </p>

      {favorites.length === 0 && (
        <p className={styles.favorites__empty}>Your favorites list is empty</p>
      )}

      {favorites.length > 0 && visibleFavorites.length === 0 && (
        <p className={styles.favorites__empty}>
          There are no products matching the query
        </p>
      )}

      {visibleFavorites.length > 0 && (
        <ProductsList products={visibleFavorites} />
      )}
    </div>
  );
};
