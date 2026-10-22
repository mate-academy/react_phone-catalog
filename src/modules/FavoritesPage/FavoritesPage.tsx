import { useEffect, useState } from 'react';

import { useShop } from '../../context/ShopContext';
import { getProducts } from '../../services/products';
import type { Product } from '../../types';
import { ProductCard } from '../shared/components/ProductCard';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favoriteItems } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Unable to load products'))
      .finally(() => setLoading(false));
  }, []);

  const favoriteProducts = products.filter(product =>
    favoriteItems.includes(product.itemId),
  );

  if (loading) {
    return (
      <main className={styles.page}>
        <p>Loading favorites...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>
        {favoriteProducts.length}{' '}
        {favoriteProducts.length === 1 ? 'item' : 'items'}
      </p>

      {favoriteProducts.length === 0 ? (
        <p>There are no favorites yet</p>
      ) : (
        <div className={styles.grid}>
          {favoriteProducts.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};
