import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { ProductsList } from '../../components/ProductList/ProductList';
import { useFavorites } from '../shared/contexts/FavoritesContext';
import { useProducts } from '../shared/hooks/useProducts';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { products, isLoading, hasError, reload } = useProducts();

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.id),
  );

  if (favorites.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.emptyMessageContainer}>
            <p className={styles.emptyMessage}>
              You have no favorite products yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs items={[{ label: 'Favorites' }]} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Favorites</h1>

          {!isLoading && !hasError && (
            <div className={styles.modelsCount}>
              {favoriteProducts.length} model
              {favoriteProducts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && <ErrorMessage onReload={reload} />}

        {!isLoading && !hasError && (
          <ProductsList
            products={favoriteProducts}
            emptyMessage="There are no favorite products yet"
            showFilter={false}
          />
        )}
      </div>
    </main>
  );
};
