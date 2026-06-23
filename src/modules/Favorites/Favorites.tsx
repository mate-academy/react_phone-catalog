
import { FavoritesContext } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../../shared/components/Breadcrumbs';
import { ProductList } from '../../shared/components/ProductList';
import styles from './Favorites.module.scss';


import { useContext } from 'react';

export const Favorites = () => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    return null;
  }

  const { favorites } = favoritesContext;

  return (
    <div className={styles.pageGrid}>
      <div className={styles.favorites__breadcrumbs}>
        <Breadcrumbs title="favourites" />
      </div>

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.modelsCount}>{`${favorites.length} models`}</p>
      <ProductList className={styles.products} products={favorites} />
    </div>
  );
};
