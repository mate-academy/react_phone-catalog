import classNames from 'classnames';
import { FavouritesBreadcrumbs } from './components/FavouritesBreadcrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavourites } from '@/hooks/useFavourites';
import { useFetch } from '../shared/hooks/useFetch';
import { FetchOptions } from '@/types/FetchOptions';
import { getProductsByIds } from '@/api/product.service';

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

      <section>
        <h1 className={styles.title}>Favourites</h1>
        <span className={styles.itemsCount}>{favourites.length} items</span>
      </section>

      <section className={styles.products}>
        <ProductsList
          itemsPerPage={favourites.length}
          products={products}
          isLoading={loading}
          emptyMessage="No products in favourites"
          error={error}
          onRefetch={handleFetch}
        />
      </section>
    </div>
  );
};
