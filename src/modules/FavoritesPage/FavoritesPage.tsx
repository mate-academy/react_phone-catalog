import { useFavorites } from '@/contexts/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />
      <h1>Favorites page</h1>
      {favorites.length === 0 ? (
        <p className={styles.empty}>You have no favorites yet</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
