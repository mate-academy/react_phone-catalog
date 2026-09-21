import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
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
    <div className={styles.page}>
      <div className={styles.navPath}>
        <Link to="/" className={styles.homeIcon} aria-label="Home">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={
                'M2 6.5L8 2L14 6.5V13.5C14 13.7652 13.8946 14.0196 ' +
                '13.7071 14.2071C13.5196 14.3946 13.2652 14.5 13 14.5H3' +
                'C2.73478 14.5 2.48043 14.3946 2.29289 14.2071' +
                'C2.10536 14.0196 2 13.7652 2 13.5V6.5Z'
              }
              stroke="#0F0F11"
              strokeWidth="1.2"
            />
          </svg>
        </Link>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>Favorites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.subtitle}>{visibleFavorites.length} models</p>

      {visibleFavorites.length === 0 ? (
        <div className={styles.emptyBox}>
          <p className={styles.emptyText}>
            {favorites.length === 0
              ? "You don't have any favourite items yet"
              : 'There are no matching products in favourites'}
          </p>
          <Link to="/" className={styles.shopBtn}>
            Go shopping
          </Link>
        </div>
      ) : (
        <ProductsList products={visibleFavorites} />
      )}
    </div>
  );
};
