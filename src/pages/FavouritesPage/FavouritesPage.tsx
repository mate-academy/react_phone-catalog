import { BreadCrumbs } from 'src/components/ui/BreadCrumbs/BreadCrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductList } from 'src/components/ProductList/ProductList';
import { useStoreContext } from 'src/context/StoreContext';
import { EmptyState } from 'src/components/EmptyState/EmptyState';

export const FavoritesPage = () => {
  const { favourites } = useStoreContext();

  return (
    <div className={styles.favoritesPage}>
      <BreadCrumbs className={styles.breadCrumbs} />
      <h1 className={styles.pageTitle}>Favourites</h1>
      <span className={styles.itemsCount}>{favourites.length} items</span>
      <ProductList products={favourites} />

      {favourites.length === 0 && <EmptyState type="favourites" />}
    </div>
  );
};
