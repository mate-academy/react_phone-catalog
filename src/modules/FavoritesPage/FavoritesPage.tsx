import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Product } from '../../features/types/productType';
import { getProducts } from '../../api/products';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductsList';

export const FavoritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items,
  );

  useEffect(() => {
    setLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const favoriteProducts = products.filter(product =>
    favoriteItems.includes(product.itemId),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.favoritesPage__wrapper}>
        <Breadcrumbs />
        <div className={styles.favoritesPage__textBlock}>
          <h1 className={styles.favoritesPage__title}>Favorites</h1>
          <p className={styles.favoritesPage__count}>
            {favoriteItems.length} items
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <p>Nothing here yet</p>
        ) : (
          <ProductList products={favoriteProducts} />
        )}
      </div>
    </div>
  );
};
