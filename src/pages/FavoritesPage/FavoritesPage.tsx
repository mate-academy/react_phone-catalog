import { BreadCrumbs } from '../../components/BreadCrumbs';
import { useFavorites } from '../../context';
import { ProductsList } from '../../modules/ProductsList';
import styles from './FavoritesPage.styles.module.scss';
import emptyFavorites from '../../assets/emptyFavorites.png';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section className={styles.favoritesPage}>
      <BreadCrumbs items={[{ title: 'Favourites' }]} />
      <div className={styles.heading}>
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.items}>{favorites.length} items</p>
      </div>
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src={emptyFavorites}
            alt="No favourites products"
            className={styles.emptyImage}
          />

          <h2 className={styles.emptyTitle}>Your favourites list is empty</h2>

          <p className={styles.emptyText}>
            Tap the heart icon on any product to add it here.
          </p>
        </div>
      ) : (
        <ProductsList products={favorites} />
      )}
    </section>
  );
};
