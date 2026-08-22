import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductsList } from '../shared/components/ProductsList';
import { EmptyMessage } from '../shared/components/RequestStatus';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const visibleFavorites = useMemo(() => {
    if (!query) {
      return favorites;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return favorites.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery),
    );
  }, [favorites, query]);

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.page__title}>Favorites</h1>

      {favorites.length === 0 && (
        <EmptyMessage message="You have no favorite products yet" />
      )}

      {favorites.length > 0 && visibleFavorites.length === 0 && (
        <EmptyMessage message="There are no products matching the query" />
      )}

      {visibleFavorites.length > 0 && (
        <ProductsList products={visibleFavorites} />
      )}
    </div>
  );
};
