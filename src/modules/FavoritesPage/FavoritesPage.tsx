import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { useFavorites } from '../../contexts/FavoritesContext';
import {
  fetchListProducts,
  filterProductsByQuery,
} from '../../services/products';
import styles from './FavoritesPage.module.scss';
import type { Product } from '../../types';

export const FavoritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchListProducts()
      .then(items =>
        setProducts(
          items.filter(item =>
            favorites.includes(item.itemId || item.id.toString()),
          ),
        ),
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [favorites]);

  const filtered = useMemo(
    () => filterProductsByQuery(products, query),
    [products, query],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        <p>Something went wrong while loading favorites.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.message}>You have no favorite products yet.</div>
    );
  }

  if (!filtered.length) {
    return (
      <div className={styles.message}>
        There are no favorite products matching the query.
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Favorites</h1>
      <ProductsList products={filtered} />
    </main>
  );
};
