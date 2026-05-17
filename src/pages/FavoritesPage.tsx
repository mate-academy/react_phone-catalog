import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/api';
import { Loader } from '../components/Loader';
import styles from './pages.module.scss';

export const FavoritesPage = () => {
  const { ids } = useFavorites();
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useAsync(getProducts, []);
  const query = (searchParams.get('query') || '').toLowerCase().trim();

  const products = useMemo(() => {
    if (!data) {
      return [];
    }

    const favorites = data.filter(product => ids.includes(product.itemId));

    if (!query) {
      return favorites;
    }

    return favorites.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [data, ids, query]);

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
      ) : query ? (
        <p>There are no favorites matching the query</p>
      ) : (
        <p>No favorites yet</p>
      )}
    </div>
  );
};
