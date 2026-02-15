import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <h1 className="title">Favourites</h1>

      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <h2>You have no favorites yet</h2>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
