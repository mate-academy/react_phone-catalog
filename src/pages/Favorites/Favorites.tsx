import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';
import { useLocalStorage } from '../../hooks/useLocaleStorage';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

import styles from './Favorites.module.scss';

export const Favorites = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [storedFavorites] = useLocalStorage<Product[]>('favorites', []);

  useEffect(() => {
    setProducts(storedFavorites);
  }, [storedFavorites]);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs />
        <div className="section-title-wrapper">
          <h1>Favorites</h1>
          <p className="main-text main-text--secondary">
            {storedFavorites.length === 1
              ? `${storedFavorites.length} item`
              : `${storedFavorites.length} items`}
          </p>
        </div>
        {products.length === 0 ? (
          <p className="main-text main-text--centered">
            You don&apos;t have Favorite products yet
          </p>
        ) : (
          <div className={styles['favorites__products-wrapper']}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
