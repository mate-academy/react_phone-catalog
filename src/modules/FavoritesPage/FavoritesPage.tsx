import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ label: 'Favorites' }]} />

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.message}>There are no favorites yet</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
