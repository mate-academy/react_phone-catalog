import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { useStore } from '../../context/StoreContext';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { products, favorites, isLoading, error, reloadProducts } = useStore();

  const favoriteProducts = products.filter(product => {
    return favorites.includes(product.id);
  });

  const favoritesCount = favoriteProducts.length;

  if (isLoading) {
    return (
      <section className={styles.favoritesPage}>
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.favoritesPage}>
        <div className={styles.message}>
          <p className={styles.messageText}>{error}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={reloadProducts}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.favoritesPage}>
      <Breadcrumbs currentPage="Favorites" />

      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>
        {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
      </p>

      {favoriteProducts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>You have no favorite products yet</p>

          <p className={styles.emptyText}>
            Add products to favorites by clicking the heart button.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
