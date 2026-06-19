import { useMemo } from 'react';
import { useFavorite } from '../../../favorites-context/FavoritesContext';
import { ProductList } from '../../shared/components/ProductsList';
import styles from './FavoriteContent.module.scss';

export const FavoriteContent = () => {
  const { favorite } = useFavorite();
  const favoriteProducts = useMemo(() => {
    return favorite.map(item => item.product);
  }, [favorite]);

  if (favorite.length === 0) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorMessage}>Your favorites list is empty</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Favorites</h2>
        <span className={styles.currentQuantity}>{favorite.length} items</span>

        <div className={styles.favoriteList}>
          <ProductList products={favoriteProducts} />
        </div>
      </div>
    </div>
  );
};
