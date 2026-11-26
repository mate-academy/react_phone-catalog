import { ProductsList } from '../shared/components/ProductsList';
import { FavoritesHeader } from './components/FavoritesHeader';
import { EmptyFavorites } from './components/EmptyFavorites';
import { useFavorites } from '../shared/context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export function FavoritesPage(): JSX.Element {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <FavoritesHeader />
        <EmptyFavorites />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <FavoritesHeader />
      <ProductsList products={favorites} className={styles.productsList} />
    </div>
  );
}
