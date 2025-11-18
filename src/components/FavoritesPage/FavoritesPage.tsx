import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FavoritesPage.module.scss';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import iconBack from '../../../public/icons/Vector (Stroke).svg';

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favourites } = useCart();

  return (
    <div className={styles.favourites}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={iconBack} alt="back" className={styles.icon__back} />
        <div className={styles.navText__1}>Back</div>
      </button>
      <h1 className={styles.title}>Favourites</h1>

      {favourites.length === 0 ? (
        <p className={styles.empty}>You don't have any favorite items yet 😔</p>
      ) : (
        <div className={styles.grid}>
          {favourites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
