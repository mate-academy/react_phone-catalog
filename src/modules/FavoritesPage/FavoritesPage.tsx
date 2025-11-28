import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductCard } from '../HomePage/componets/ProductCard';
import { HomeBtn } from '../../components/HomeBtn';

export const FavoritesPage = () => {
  const { favorites, totalFavorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites_nav}>
        <HomeBtn />
        <p>Favorites</p>
      </div>
      <h1 className={styles.favorites_header}>Favorites</h1>
      <div className={styles.favorites_total}>
        {totalFavorites === 1 ? '1 item' : `${totalFavorites} items`}
      </div>
      <div className={styles.favorites_list}>
        {favorites.length === 0 ? (
          <p className={styles.favorites_empty}>No favorite products yet</p>
        ) : (
          favorites.map(product => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>
    </div>
  );
};
