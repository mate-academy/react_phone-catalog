import { useFavorite } from '../../../favorites-context/FavoritesContext';
import { ProductCard } from '../../shared/components/ProductCard';
import styles from './FavoriteContent.module.scss';

export const FavoriteContent = () => {
  const { favorite } = useFavorite();

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Favorites</h2>
        <span className={styles.currentQuantity}>{favorite.length} items</span>

        <div className={styles.favoriteList}>
          {favorite.map(product => (
            <ProductCard key={product.product.id} product={product.product} />
          ))}
        </div>
      </div>
    </div>
  );
};
