import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src={`${getBaseUrl()}img/icons/home.svg`} alt="Home" />
        </Link>
        <span>›</span>
        <span>Favorites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.subtitle}>{favorites.length} items</p>

      {favorites.length > 0 ? (
        <div className={styles.productsGrid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyMessage}>Your favorites list is empty.</div>
      )}
    </div>
  );
};
