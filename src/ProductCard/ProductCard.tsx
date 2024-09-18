import React from 'react';
import styles from './ProductCard.module.scss';
import '../../public/img/Favourites.png';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
  imageUrl: string;
  isFavorite: boolean;
  onAddToCart: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  screen,
  capacity,
  ram,
  imageUrl,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}) => {
  const filteredScreen = screen.replace('(Super Retina XDR)', '').trim();

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={name} className={styles.productImage} />

      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{name}</h3>
        <div className={styles.priceSection}>
          <h3 className={styles.originalPrice}>${price}</h3>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productFeature}>
            <span className={styles.featureLabel}>Screen</span>
            <span className={styles.featureValue}>{filteredScreen}</span>
          </div>
          <div className={styles.productFeature}>
            <span className={styles.featureLabel}>Capacity</span>
            <span className={styles.featureValue}>{capacity}</span>
          </div>
          <div className={styles.productFeature}>
            <span className={styles.featureLabel}>RAM</span>
            <span className={styles.featureValue}>{ram}</span>
          </div>
        </div>
        <button
          className={styles.addToCartButton}
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </button>
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={() => onToggleFavorite(id)}
        >
          <img src="../../public/img/Favourites.png" alt="" />
        </button>
      </div>
    </div>
  );
};
