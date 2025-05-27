import { Link } from 'react-router-dom';
import styles from '../FavoritePage/FavoritePageStyles.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';
import { useFavorites } from '../../utils/FavoritePageContext';

export function FavoritePage() {
  const { favoritesCount, getFavoritesAsProducts } = useFavorites();
  const favoriteProducts = getFavoritesAsProducts();

  return (
    <>
      <div className={styles.whereIAm}>
        <Link to="/" className={styles.homeImg}>
          <img src="/img/icons/Home.svg" alt="home" />
        </Link>
        <div className={styles.phonesRight}>
          <p>&gt;</p>
        </div>
        <div className={styles.phonesText}>
          <p className={styles.CategoryText}>Favorites</p>
        </div>
      </div>

      <div className={styles.nameText}>
        <h1 className={styles.nameText}>Favourites</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No favorites yet</h2>
        </div>
      ) : (
        <div className={styles.countContainer}>
          <p className={styles.count}>
            {favoritesCount} item{favoritesCount !== 1 ? 's' : ''}
          </p>
          <ProductList products={favoriteProducts} />
        </div>
      )}
    </>
  );
}
