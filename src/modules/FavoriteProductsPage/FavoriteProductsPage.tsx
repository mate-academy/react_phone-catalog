import React from 'react';
import { Card } from '../../components/Card';
import { getCardById } from '../shared/services/productService';
import { Card as CardItem } from '../../types/Card';
import styles from './FavoriteProductsPage.module.scss';
import { useAppContext } from '../../contexts/AppContext';

export const FavoriteProductsPage: React.FC = () => {
  const { favouriteProductsIds } = useAppContext();
  return (
    <main className={styles.main}>
      <h1 className={`${styles.title}`}>Favourites</h1>

      <p className={`${styles.counter} bodyText`}>
        {favouriteProductsIds.length === 1
          ? '1 item'
          : `${favouriteProductsIds.length} items`}
      </p>

      <div className={styles.cards}>
        {favouriteProductsIds.map((productId: number) => (
          <Card key={productId} card={getCardById(productId) as CardItem} />
        ))}
      </div>
    </main>
  );
};
