import React from 'react';
import { Link } from 'react-router-dom';
import { ProductList } from '../../components/ProductList/ProductList';
import { useFavourites } from '../../context/FavouriteContext';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav className={styles.breadcrumbs}>
          <Link to="/">
            <img src="./img/HomeIcon.svg" alt="home" />
          </Link>
          <img src="./img/Back.svg" alt="arrow" className={styles.arrowIcon} />
          <span>Favorites</span>
        </nav>

        <h1 className={styles.title}>Favorites</h1>
        <p className={`${styles.modelsCount} body-text14Bold`}>
          {favourites.length} items
        </p>

        {favourites.length > 0 ? (
          <ProductList products={favourites} className={styles.productList} />
        ) : (
          <p className={styles.emptyMessage}>Your favorites list is empty</p>
        )}
      </div>
    </div>
  );
};
