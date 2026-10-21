import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.subtitle}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <ProductsList products={favorites} />
      ) : (
        <div className={styles.emptyMessage}>Your favorites list is empty.</div>
      )}
    </div>
  );
};
