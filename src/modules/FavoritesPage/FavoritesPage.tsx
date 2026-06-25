import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your favorites list is empty</p>
          <Link to="/" className={styles.emptyLink}>
            Go shopping
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.count}>{favorites.length} items</p>
          <div className={styles.grid}>
            {favorites.map(product => (
              <ProductCard key={product.itemId} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
