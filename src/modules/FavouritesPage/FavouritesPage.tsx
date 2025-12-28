import classNames from 'classnames';
import { FavouritesBreadcrumbs } from './components/FavouritesBreadcrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { useFavourites } from '@/hooks/useFavourites';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

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
          products={favourites}
          emptyMessage="No products in favourites"
        />
      </section>
    </div>
  );
};
