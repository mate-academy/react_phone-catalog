import { useGlobalState } from '../../context/store';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductList } from '../shared/ProductList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites } = useGlobalState();

  return (
    <div className={styles.favouritesContent}>
      <div className={styles.favouritesBreadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.favouritesTitle}>Favourites</h1>

      <div className={styles.favouritesQuantity}>
        {favourites.length === 1 ? '1 item' : `${favourites.length} items`}
      </div>

      <div className={styles.favouritesItems}>
        <ProductList products={favourites} />
      </div>
    </div>
  );
};
