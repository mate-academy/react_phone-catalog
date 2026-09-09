import { useFavorites } from '../shared/context/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs items={[{ text: 'Favourites' }]} />
      </div>

      <h1 className={styles.title}>Favourites</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>There are no favourite products yet</p>
      ) : (
        <>
          <p className={styles.count}>
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </p>

          <ProductsList products={favorites} showFullPrice />
        </>
      )}
    </div>
  );
};
