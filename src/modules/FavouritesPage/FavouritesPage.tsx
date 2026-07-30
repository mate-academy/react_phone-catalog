import { useFavourites } from '@/context/FavouritesContext';
import { ProductsList } from '@/components/ProductsList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>
        {favourites.length} item{favourites.length === 1 ? '' : 's'}
      </p>

      {favourites.length === 0 ? (
        <p className={styles.emptyMessage}>There are no favourites yet</p>
      ) : (
        <div className={styles.list}>
          <ProductsList products={favourites} />
        </div>
      )}
    </div>
  );
};
