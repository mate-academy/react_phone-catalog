import React from 'react';
import styles from './Favorites.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { Product } from '../../../shared/Product';
import { ContinueShopping } from '../../../shared/ContinueShopping';

export const Favorites: React.FC = () => {
  const { favourites } = useAppSelector(state => state.favourites);

  return (
    <div className={`page__favorites ${styles.favorites}`}>
      <div className={styles.favorites__container}>
        <h2 className={`${styles.favorites__title} main-title`}>
          Favourites {favourites.length === 0 ? 'is empty' : ''}
        </h2>

        {favourites.length !== 0 && (
          <p className={styles.favorites__items}>{favourites.length} items</p>
        )}

        {favourites.length === 0 && <ContinueShopping />}

        <div className={styles.favorites__row}>
          {favourites.map(good => (
            <div className={styles.favorites__column} key={good.id}>
              <Product product={good} hasFullPrice={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
