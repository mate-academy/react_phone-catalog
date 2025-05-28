import React from 'react';
import styles from './FavoritesPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumb } from '../../components/Breadcrumb';

export const FavoritesPage: React.FC = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorites);
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong while loading products.</p>;
  }

  const favoriteProducts = products.filter(product =>
    favoriteIds.includes(product.id),
  );

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumb current="Favorites" />

      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>{favoriteProducts.length} items</p>

      {favoriteProducts.length === 0 ? (
        <p className={styles.empty}>No favourite products yet</p>
      ) : (
        <ul className={styles.list}>
          {favoriteProducts.map(product => (
            <li key={product.id} className={styles.item}>
              <ProductCard
                product={product}
                showFullPrice={product.fullPrice > product.price}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
