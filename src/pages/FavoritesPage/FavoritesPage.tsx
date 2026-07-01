import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsGrid } from '../../components/ProductsGrid/ProductsGrid';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favoriteProducts } = useFavorites();

  return (
    <div className={`${styles.main} ${styles.container}`}>
      <div className={styles.main__breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.main__title}>Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <p className={styles.main__errorTitle}>
          There are no favorite products
        </p>
      ) : (
        <>
          <span className={styles.main__count}>
            {favoriteProducts.length} items
          </span>
          <div className={styles.main__productsGrid}>
            <ProductsGrid products={favoriteProducts} />
          </div>
        </>
      )}
    </div>
  );
};
