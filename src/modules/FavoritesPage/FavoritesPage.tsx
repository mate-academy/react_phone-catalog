import { useAppSelector } from '../../store/hooks';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const favorites = useAppSelector(state => state.favorites.items);

  return (
    <div className={styles.page}>
      <div className={styles.page__breadcrumbs}>
        <Breadcrumbs category="favorites" />
      </div>

      <h1 className={styles.page__title}>Favorites</h1>
      <span className={styles.page__count}>{favorites.length} items</span>

      {favorites.length === 0 ? (
        <p className={styles.page__empty}>
          You have not added any products to favorites yet.
        </p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};
