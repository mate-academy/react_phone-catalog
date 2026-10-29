import React, { useContext } from 'react';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className={styles.page}>
      <Breadcrumbs category="favorites" />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.text}>{favorites.length} items</p>
      {favorites.length === 0 ? (
        <h2 className={styles.notLiked}>You have no favourites yet</h2>
      ) : (
        <ProductList products={favorites} />
      )}
    </div>
  );
};
