import { useMemo } from 'react';
import { ProductList } from '../components/ProductList';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/api';
import { Loader } from '../components/Loader';
import styles from './pages.module.scss';

export const FavoritesPage = () => {
  const { ids } = useFavorites();
  const { data, loading, error } = useAsync(getProducts, []);

  const products = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(product => ids.includes(product.itemId));
  }, [data, ids]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className={styles.page}>
      <h1>Favorites</h1>
      <p>{products.length} items</p>

      {products.length ? (
        <ProductList products={products} />
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
};
