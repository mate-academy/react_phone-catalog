import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>No favourites yet</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.itemId} product={product} fullWidth />
          ))}
        </div>
      )}
    </div>
  );
};
