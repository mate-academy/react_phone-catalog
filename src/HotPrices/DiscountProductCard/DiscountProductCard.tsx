import React from 'react';
import styles from './DiscountProductCard.module.scss';
import { useCart } from '../../UseCart/UseCart';

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

export const DiscountProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  discountPrice,
  screen,
  capacity,
  ram,
  imageUrl,
  onAddToCart,
  onToggleFavorite,
}) => {
  const filteredScreen = screen.replace('(Super Retina XDR)', '').trim();
  const { state } = useCart();
  const isInCart = state.cart.some(cartItem => cartItem.id === id);
  const isFavorite = state.favorites.some(fav => fav.id === id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart(id);
  };

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite(id);
  };

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={name} className={styles.productImage} />

      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{name}</h3>
        <div className={styles.priceSection}>
          {discountPrice ? (
            <>
              <p className={styles.discountPrice}>${discountPrice}</p>
              <p className={styles.originalPrice}>${price}</p>
            </>
          ) : (
            <span className={styles.price}>${price}</span>
          )}
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
        <div className={styles.bottom_buttons}>
          <button
            className={`${styles.addToCartButton} ${isInCart ? styles.addedToCart : ''}`}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            className={styles.favoriteButton}
            onClick={handleToggleFavorite}
          >
            <img
              className={styles.favoriteImage}
              src={
                isFavorite ? 'img/Favourites-filled.svg' : 'img/Favourites.svg'
              }
              alt="favorite"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
