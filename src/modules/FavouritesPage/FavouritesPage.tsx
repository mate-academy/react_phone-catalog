import classNames from 'classnames';
import { FavouritesBreadcrumbs } from './components/FavouritesBreadcrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavourites } from '@/hooks/useFavourites';
import { useFetch } from '../shared/hooks/useFetch';
import { FetchOptions } from '@/types/FetchOptions';
import { getProductsByIds } from '@/api/product.service';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { EmptyMessage } from '../shared/components/EmptyMessage';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

  const {
    data: products,
    loading,
    handleFetch,
    error,
  } = useFetch(
    (options: FetchOptions) => {
      if (favourites.length === 0) {
        return Promise.resolve([]);
      }

      return getProductsByIds(favourites, options);
    },
    {
      initialValue: [],
      dependency: [favourites],
    },
  );

  return (
    <div className={classNames(styles.wrapper, 'container')}>
      <FavouritesBreadcrumbs />

      <h1 className={styles.title}>Favourites</h1>
      <span className={styles.itemsCount}>{favourites.length} items</span>

      <section className={styles.mainContent}>
        {error && (
          <div className={styles.messageWrapper}>
            <ErrorMessage message={error} onRetry={handleFetch} />
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className={styles.messageWrapper}>
            <EmptyMessage message={`No favourites products`} />
          </div>
        )}

        {loading && (
          <ProductsList
            isLoading
            products={[]}
            itemsPerPage={favourites.length}
          />
        )}

        {products.length !== 0 && !loading && (
          <ProductsList products={products} itemsPerPage={favourites.length} />
        )}
      </section>
    </div>
  );
};
