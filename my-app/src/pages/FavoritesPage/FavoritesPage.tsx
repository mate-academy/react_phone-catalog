import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '../../components/BradCrumbs';
import { Product } from '../../types/types';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favoriteItems } = useContext(FavoritesContext);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      {favoriteItems.length > 0 ? (
        <>
          <p className={styles.amount}>{favoriteItems?.length} models</p>
          <div className={styles.productsList}>
            {favoriteItems.map((product: Product) => (
              <div className={styles.itemCard} key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className={styles.emptyMessage}>You don't have favorite items yet</p>
        </>
      )}
    </div>
  );
};
