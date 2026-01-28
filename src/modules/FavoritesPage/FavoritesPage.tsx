import React from 'react';
import styles from './FavoritesPage.module.scss';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import { ProductCard } from 'shared/ProductCard';
import { Breadcrumbs } from 'shared/Breadcrumbs';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useProducts();

  return (
    <>
      <Header />
      <div className={styles.favpage}>
        <div className={styles.favpage__header}>
          <Breadcrumbs category={'Favourites'} productId={''} />
          <h1 className={styles.favpage__title}>Favourites</h1>
        </div>

        {favorites.length === 0 ? (
          <div className={styles.favpage__empty}>
            <p className={styles.favpage__p}>No favorite products yet</p>
          </div>
        ) : (
          <>
            <p className={styles.favpage__countmodel_p}>
              {favorites.length} items
            </p>
            <div className={styles.favpage__list}>
              {favorites.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
