import React from 'react';
import { useFavorite } from '../../../../favorites-context/FavoritesContext';
import { Product } from '../../../../types/product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../../../../cart-context/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const isInCart = cart.some(item => item.product.id === product.id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const { addToFavorite, removeFromFavorite, favorite } = useFavorite();
  const isInFavorite = favorite.some(item => item.product.id === product.id);

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(product);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className={styles.img} />
      </Link>
      <p className={styles.title}>{product.name}</p>

      <div className={styles.priceContainer}>
        <span className={styles.price}>
          ${product.price || product.fullPrice}
        </span>

        {product.price && product.price !== product.fullPrice && (
          <span className={styles.discount}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Screen</p>
          <span className={styles.description}>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Capacity</p>
          <span className={styles.description}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>RAM</p>
          <span className={styles.description}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.addToCart} ${isInCart ? styles.isActive : ''}`}
          aria-label="Toggle cart"
          onClick={handleCartClick}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <div>
          <button
            type="button"
            className={styles.iconLink}
            aria-label="Toggle favorites"
            onClick={handleFavoriteClick}
          >
            <img
              src={
                isInFavorite
                  ? '/img/icons/favorites-field.svg'
                  : '/img/icons/favorites.svg'
              }
              alt=""
            />
          </button>
        </div>
      </div>
    </article>
  );
};
