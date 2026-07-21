import { useFavorites } from '../../context/FavoritesContext';
import { ProductsList } from '../ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { items } = useFavorites();

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.empty}>No favorites yet</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>
      <ProductsList products={items} />
    </div>
  );
};
