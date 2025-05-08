import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import ProductsList from '../../components/ProductsList/ProductsList';
import styles from './FavoritesPage.module.scss';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite products.</p>
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;
