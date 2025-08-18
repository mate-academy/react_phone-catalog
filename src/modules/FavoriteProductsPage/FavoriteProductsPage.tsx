import React from 'react';
import { Card } from '../../components/Card';
import styles from './FavoriteProductsPage.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { Breadcrumb } from '../../components/Breadcrumb';

export const FavoriteProductsPage: React.FC = () => {
  const { favouriteProductsIds, products } = useAppContext();

  return (
    <main className={`
        ${styles.main} 
        ${favouriteProductsIds.length === 0 ? styles.emptyPage : ''}
      `}
    >
      <div className={styles.head}>
        <Breadcrumb />
        <div className={styles.headContent}>
          <h1 className={`${styles.title}`}>Favourites</h1>

          <span className={`${styles.counter} bodyText`}>
            {favouriteProductsIds.length === 1
              ? '1 item'
              : `${favouriteProductsIds.length} items`}
          </span>
        </div>
      </div>

      <div className={styles.cards}>
        {favouriteProductsIds.map((id) => (
          <Card key={id} card={
            products.find((product) => product.itemId === id)
          } />
        ))}
      </div>
    </main>
  );
};
