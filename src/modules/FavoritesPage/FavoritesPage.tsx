import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../shared/context/FavoriteContext';
import { ProductCard } from '../shared/components/ProductCard';
import HomeIcon from '../../assets/images/homeIcon.svg';
import ArrowRight from '../../assets/images/arrow-top.svg';
import styles from './FavoritePage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link to="/">
          <img src={HomeIcon} alt="Home" />
        </Link>
        <img src={ArrowRight} alt="arrow" />
        <span>Favourites</span>
      </nav>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>Your favorites list is empty</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              product={{ ...product, category: 'favorites' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
