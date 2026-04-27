import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favorites } = useProducts();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>Your favourites list is empty</p>
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
