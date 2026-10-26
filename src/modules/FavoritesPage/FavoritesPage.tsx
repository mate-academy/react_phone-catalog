import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <main className={`container ${styles.pageWrapper}`}>
      {/* Хлібні крихти */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumbLink}>
          Home
        </Link>
        <span className={styles.crumbSeparator}>&gt;</span>
        <span className={styles.crumbCurrent}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Your favourites list is empty</p>
        </div>
      ) : (
        <div className="mainGrid">
          {favorites.map(product => (
            <div key={product.itemId || product.id} className="colProductCard">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
