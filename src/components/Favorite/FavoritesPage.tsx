import React from 'react';

import { useGlobal } from '../CartContext/CartContext';

import styles from './FavoritesPage.module.scss';

import { useNavigate } from 'react-router-dom';

import home from '../../api/buttoms/Right.png';
import { ProductCard } from '../ProduuctCard/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useGlobal();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={home} alt="back" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{favorites.length} items</p>

      <div className={styles.grid}>
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} /> //
        ))}
      </div>
    </div>
  );
};
