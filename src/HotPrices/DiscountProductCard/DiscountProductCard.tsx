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
    <div className={styles.product_card}>
      <div className={styles.product_container_img}>
        <img src={imageUrl} alt={name} className={styles.product_image} />
      </div>
      <div className={styles.product_details}>
        <h3 className={styles.product_title}>{name}</h3>
        <div className={styles.price_section}>
          {discountPrice ? (
            <>
              <p className={styles.discount_price}>${discountPrice}</p>
              <p className={styles.original_price}>${price}</p>
            </>
          ) : (
            <span className={styles.price}>${price}</span>
          )}
        </div>
        <div className={styles.product_info}>
          <div className={styles.product_feature}>
            <span className={styles.feature_label}>Screen</span>
            <span className={styles.feature_value}>{filteredScreen}</span>
          </div>
          <div className={styles.product_feature}>
            <span className={styles.feature_label}>Capacity</span>
            <span className={styles.feature_value}>{capacity}</span>
          </div>
          <div className={styles.product_feature}>
            <span className={styles.feature_label}>RAM</span>
            <span className={styles.feature_value}>{ram}</span>
          </div>
        </div>
        <div className={styles.bottom_buttons}>
          <button
            className={`${styles.add_to_cart_button} ${isInCart ? styles.added_to_cart : ''}`}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            className={styles.favorite_button}
            onClick={handleToggleFavorite}
          >
            <img
              className={styles.favorite_image}
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
