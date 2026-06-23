import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { useStore } from '../../context';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img
            src="img/icons/home.svg"
            alt="Home"
            className={styles.homeIcon}
            onError={e => {
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.style.display = 'none';
              // eslint-disable-next-line no-param-reassign
              e.currentTarget.parentElement!.innerText = 'Home';
            }}
          />
        </Link>

        <span className={styles.arrowIcon}>{'>'}</span>

        <span className={styles.currentParams}>Favourites</span>
      </div>

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>No favourites yet</h2>
          <p>Add something nice to your wishlist!</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
