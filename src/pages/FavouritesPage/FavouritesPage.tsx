import React from 'react';
import styles from './FavouritesPage.module.scss';
import { AppContext } from '../../AppContext';
import { Breadcrumbs, ProductCard } from '../../components';

export const FavouritesPage = () => {
  const { favouriteProducts } = React.useContext(AppContext);

  return (
    <section className={styles.container}>
      <Breadcrumbs category="favourites" />

      <div className={styles.header}>
        <h1 className={styles.title}>Favourites</h1>
        {favouriteProducts.length > 0 && (
          <p className={styles.productCount}>
            {favouriteProducts.length} items
          </p>
        )}
      </div>

      <ul className={styles.productList}>
        {favouriteProducts.map(product => (
          <li key={product.id}>
            <ProductCard product={product} discount={true} />
          </li>
        ))}
      </ul>
    </section>
  );
};
