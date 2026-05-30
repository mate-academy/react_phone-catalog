import React, { useEffect, useState } from 'react';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import { useFavorites } from '../shared/contexts/FavouritesContext';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/api';

import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(fetchedProducts => setProducts(fetchedProducts));
  }, []);

  const filteredProducts = products.filter(item =>
    favorites.includes(String(item.id)),
  );

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />
      <h1 className={styles.favorites__title}>Favorites</h1>
      <p className={styles.favorites__count}>
        {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
      </p>
      {favorites.length ? (
        <div className={styles.favorites__content}>
          <ProductsList products={filteredProducts} displayType="discount" />
        </div>
      ) : (
        <div className={styles.favorites__empty}>
          <img
            src="./img/cart-is-empty.png"
            alt="cart is empty"
            className={styles['favorites__empty-image']}
          />
        </div>
      )}
    </div>
  );
};
