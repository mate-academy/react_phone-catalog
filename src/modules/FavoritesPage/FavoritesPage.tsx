import React from 'react';
import styles from './FavoritesPage.module.scss';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { useLocation } from 'react-router-dom';

import { Product } from '../../shared/Product';
import { useSelector } from 'react-redux';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';
import { RootState } from '../../store/type';
import { ErrorPage } from '../ErrorPage';

export const FavoritesPage: React.FC = () => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const favoritesIds: string[] = useSelector(
    (state: RootState) => state.favorites,
  );

  const favorites =
    products && Array.isArray(products)
      ? products.filter(product => favoritesIds.includes(product.itemId))
      : [];

  if (error) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <section className={styles.favorites}>
        <div className={styles.container}>
          <div className={styles.favorites__content}>
            <Breadcrumb pathnames={pathnames} />

            <div className={styles.favorites__info}>
              <h1 className={styles.favorites__title}>Favorites</h1>
              <span>{favorites.length} items</span>
            </div>

            {favorites.length === 0 && (
              <h2 className={styles.favorites__empty}>No favorites yet</h2>
            )}

            <div className={styles.favorites__products}>
              {favorites.map(product => (
                <Product
                  key={product.id}
                  product={product}
                  fullPriceActive={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
