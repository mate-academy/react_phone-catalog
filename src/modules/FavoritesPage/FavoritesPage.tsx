import { ProductsList } from '../shared/components/ProductsList';
import { useFavorites } from '../shared/context';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favoritesCount} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>Your favourites list is empty</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
