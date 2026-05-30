import { useEffect, useMemo, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, filterProducts } from '../../api/products';
import { Product } from '../../types';
import { AppContext } from '../../context/AppContext';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';
import { EmptyState } from '../../components/EmptyState';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const context = useContext(AppContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    fetchAllProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const favorites = products.filter(product =>
      context?.favorites.includes(product.id),
    );

    return filterProducts(favorites, query);
  }, [products, query, context]);

  if (!context) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.error}>Failed to load favorite products.</div>
    );
  }

  if (filtered.length === 0) {
    return <EmptyState message="No favorite products yet" />;
  }

  return (
    <div className={styles.favoritesPage}>
      <h1>Favorites</h1>
      <ProductList products={filtered} />
    </div>
  );
};
