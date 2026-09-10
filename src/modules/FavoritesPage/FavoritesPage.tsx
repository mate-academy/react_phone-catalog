import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../shared/components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favorites}>
      <Breadcrumbs />

      <h1 className={styles.favorites__title}>Favourites</h1>
      <p className={styles.favorites__count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <div className={styles.favorites__empty}>
          <h2>Your favourites list is empty</h2>
          <Link to="/phones" className={styles.favorites__btn}>
            Explore store
          </Link>
        </div>
      ) : (
        <div className={styles.favorites__grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
