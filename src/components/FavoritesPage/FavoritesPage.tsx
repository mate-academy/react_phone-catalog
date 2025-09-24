import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductGrid } from '../ProductGrid';
import { useFavorites } from '../../contexts/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />
      <h1 className={styles.favorites__header}>Favorites</h1>
      <span className={styles.favorites__quantity}>
        {`${favorites.length} items`}
      </span>
      <div className={styles.favorites__main}>
        {favorites.length < 1 ? (
          <div className={styles.favorites__empty}>
            <span>Your favorites list is empty 😮</span>
            <img
              src="/img/cart-is-empty.png"
              alt="Empty favorites"
              className={styles.favorites__emptyImage}
            />
          </div>
        ) : (
          <ProductGrid products={favorites} />
        )}
      </div>
    </div>
  );
};
