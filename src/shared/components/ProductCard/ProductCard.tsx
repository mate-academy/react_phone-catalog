import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart, useFavorites } from '../../context';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { itemId, name, price, fullPrice, screen, capacity, ram, image } =
    product;

  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite: checkFavorite } = useFavorites();

  const isAdded = isInCart(itemId);
  const isFavorite = checkFavorite(itemId);

  const handleToggleCart = () => {
    if (isAdded) {
      removeFromCart(itemId);
    } else {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.titleLink}>
        <h3 className={styles.title}>{name}</h3>
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice && fullPrice !== price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.addToCart} ${isAdded ? styles.added : ''}`}
          onClick={handleToggleCart}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <img
            src={
              isFavorite
                ? 'img/icons/Favourites Filled.svg'
                : 'img/icons/Favourites.svg'
            }
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  );
};
