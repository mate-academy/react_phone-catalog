import { useFavorites } from '../../../providers/FavoritesProvider';
import { ProductCard } from '../../shared/ProductCard';
import { TopNav } from '../../shared/TopNav';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <TopNav />
      <h1>Favorites</h1>

      <div>
        {favorites.length === 0 ? (
          <h3>
            Your favorite products are waiting for you! Tap ❤️ to save them here
          </h3>
        ) : (
          <>
            <span className={styles.favoritesPage__length}>
              {favorites.length} item{favorites.length !== 1 ? 's' : ''}
            </span>
            <div className={styles.favoritesPage__list}>
              {favorites.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={product.category}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
