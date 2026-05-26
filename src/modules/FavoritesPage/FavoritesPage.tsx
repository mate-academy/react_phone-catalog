import React, { useContext } from 'react';
import styles from '../FavoritesPage/FavoritesPage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { FavoritesContext } from '../../context/FavoritesContext';

export const FavoritesPage = () => {
  const { favoritesItems } = useContext(FavoritesContext);

  const countProducts = favoritesItems.length;

  return (
    <div className={styles.favoritespage}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Home.svg"
            alt="home"
          />
          <img
            className={styles.breadcrumb_icon}
            src="/img/icons/Chevron_(Arrow_Right).svg"
            alt=" to"
          />
          <p className={styles.breadcrumb_page}>favorites</p>
        </div>
        <h1 className={styles.title}>favorites</h1>
        <p className={styles.count}>{countProducts} models</p>
      </header>
      <div className={styles.products}>
        {favoritesItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
