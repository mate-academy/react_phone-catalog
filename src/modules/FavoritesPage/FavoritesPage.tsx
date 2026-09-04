import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>No favourites yet</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </main>
  );
};
