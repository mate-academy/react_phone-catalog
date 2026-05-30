import { useEffect } from 'react';
import { Breadcrumbs } from '../shared/components/breadcrumbs';
import { useAppSelector } from '../../hooks/hooks';
import { ProductList } from '../shared/components/product-list';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const products = useAppSelector(state => state.favorites);
  const productsCount = products.length;

  useEffect(() => {}, []);

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />
      <h1>Favourites</h1>
      <p className={styles.favorites__subtitle}>{productsCount} items</p>
      <div className={styles.products}>
        {products.length === 0 ? (
          <p>No favourite items found.</p>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};
