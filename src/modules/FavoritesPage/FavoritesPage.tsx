import React from 'react';
import styles from './FavoritesPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const FavoritesPage: React.FC = () => {
  const { favorites } = useAppContext();

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.topContainer}>
        <Breadcrumbs />
        <h1 className={styles.title}>Favorites</h1>
        <p className={styles.count}>
          {`${favorites.length} item${favorites.length > 1 ? 's' : ''}`}
        </p>
      </div>
      <div className={styles.container}>
        {favorites.map(product => (
          <div key={product.id} className={styles.product}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
