import React from 'react';
import { Card } from '../../components/Card';
import { getCardById } from '../shared/services/productService';
import { Card as CardItem } from '../../types/Card';
import styles from './FavoriteProductsPage.module.scss';
import { useAppContext } from '../../contexts/AppContext';
import { Link, useLocation } from 'react-router-dom';

export const FavoriteProductsPage: React.FC = () => {
  const { favouriteProductsIds } = useAppContext();
  const { pathname } = useLocation();

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <div className={styles.path}>
          <Link className={styles.home} to='/'>
            <img 
              src="/img/icons/Home.svg" 
              alt="Home" 
            />
          </Link>

          <img
            className={styles.arrow}
            src="/img/icons/arrow-disabled.svg"
            alt="Arrow"
          />

          <span className={`${styles.pageName} smallText`}>{pathname.slice(1)}</span>
        </div>

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
        {favouriteProductsIds.map((productId: number) => (
          <Card key={productId} card={getCardById(productId) as CardItem} />
        ))}
      </div>
    </main>
  );
};
