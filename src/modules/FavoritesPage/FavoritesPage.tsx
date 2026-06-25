import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <main className={styles.main}>
      <Breadcrumbs crumbs={[{ label: 'Favourites' }]} />

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Favourites</h1>
        <p className={styles.count}>{favorites.length} items</p>
      </div>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🤍</span>
          <p className={styles.emptyTitle}>No favourites yet</p>
          <p className={styles.emptyHint}>
            Press the heart icon on any product to save it here
          </p>
          <Link to="/" className={styles.emptyBtn}>
            Browse products
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
};
