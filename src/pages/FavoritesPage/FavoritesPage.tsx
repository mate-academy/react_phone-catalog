import { Breadcrumbs } from '../../components/Breadcrumbs';

import { ProductsList } from '../../components/ProductList/ProductList';
import { useFavorite } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';
export const FavoritesPage = () => {
  const { favorites } = useFavorite();

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__flex}>
        <Breadcrumbs />
        <h1 className={styles.favorites__title}>Favorites</h1>

        <span className={styles.favorites__quentites}>
          {favorites.length} models
        </span>
        <div className={styles.favorites__productsList}>
          <ProductsList products={favorites} />
        </div>
      </div>
    </div>
  );
};
