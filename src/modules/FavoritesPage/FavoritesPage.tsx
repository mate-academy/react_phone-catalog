import { useContext } from 'react';
import { NavPath } from '../shared/components/NavPath';
import styles from './FavoritesPage.module.scss';
import { FavoritesContext } from '../../store/FavoritesContext';
import { ProductList } from '../shared/components/ProductList';
import { Link } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.favoritesPageHead}>
        <NavPath items={[{ label: 'Favorites' }]} />
        <h1 className={styles.favoritesPageTitle}>Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.favoritesPageEmpty}>
          <span className={styles.favoritesPageEmptyIcon} />

          <h2 className={styles.favoritesPageEmptyTitle}>Nothing saved yet</h2>

          <p className={styles.favoritesPageEmptyText}>
            Tap the heart on any product to keep it here
          </p>

          <Link to="/phones" className={styles.favoritesPageEmptyButton}>
            Browse phones
          </Link>
        </div>
      ) : (
        <>
          <span className={styles.favoritesPageCount}>
            {favorites.length} items
          </span>

          <ProductList products={favorites} />
        </>
      )}
    </div>
  );
};
