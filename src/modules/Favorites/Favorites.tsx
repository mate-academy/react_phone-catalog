import React from 'react';
import styles from './Favorites.module.scss';
import { useGlobalState } from '../../shared/constants/GlobalContext';
import { ProductCard } from '../../components/ProductCard';

export const Favorites: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <div className={styles.Favorites}>
      <div className={styles.Favorites__top}>
        <h2 className={styles.Favorites__title}>Favorites</h2>
        <p className={styles.Favorites__counter}>
          {`${state.favorites.length} items`}
        </p>
      </div>
      <div className={styles.Favorites__wrapper}>
        {state.favorites.map(fav => (
          <ProductCard key={fav.name} product={fav} />
        ))}
      </div>
    </div>
  );
};
