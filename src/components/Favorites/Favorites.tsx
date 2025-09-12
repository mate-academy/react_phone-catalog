import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <section className={styles.favorites}>
      <div className={styles.favorites__navigation}>
        <a href="/" className={styles.favorites__linkHome}></a>
        <a href="" className={styles.favorites__arrowRight}></a>
        <a href="" className={styles.favorites__linkFavs}>
          Favorites
        </a>
      </div>

      <h1 className={styles.favorites__title}>Favorites</h1>
      <p className={styles.favorites__quantity}>{favorites.length} items</p>

      {favorites.length > 0 && (
        <ProductsList currentItems={favorites} isFavorites={true} isWideCard={true} />
      )}
    </section>
  );
};
