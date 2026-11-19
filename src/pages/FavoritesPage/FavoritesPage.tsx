import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <main className={styles.main}>
      <Breadcrumbs currentPage="Favourites" />

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <div className={styles.products}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} showFullPrice />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>Your favourites list is empty</p>
      )}
    </main>
  );
};
