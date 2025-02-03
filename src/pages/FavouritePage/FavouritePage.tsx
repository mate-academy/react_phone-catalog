import React from 'react';
import styles from './FavouritePage.module.scss';
import { useProductsContext } from '../../hooks/savedProducts';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavouritesPage = () => {
  const { likedProducts } = useProductsContext();
  const { products } = useProducts();

  const likedItems = products.filter(product =>
    likedProducts.includes(product.id),
  );

  return (
    <div className={styles.favourite}>
      <div className={styles.favourite__breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.favourite__title}>Favourites</h1>

      <p className={styles.favourite__count}>{`${likedItems.length} items`}</p>

      <div className={styles.favourite__products}>
        {likedItems.length > 0 &&
          likedItems.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              path={`/product/${item.id}`}
            />
          ))}
      </div>
    </div>
  );
};
