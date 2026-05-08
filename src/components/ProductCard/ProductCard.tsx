import React from 'react';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import favouritesIcon from '../Header/components/img/favourites.png';
import favoritedActive from './components/img/favorited-active.png';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/getAssetUrl';

interface Props {
  product: Product;
  variant?: 'default' | 'slider';
}

export const ProductCard: React.FC<Props> = ({ product, variant }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const isProductFavorite = isFavorite(product.itemId);

  const { addToCart, isInCart } = useCart();
  const isProductInCart = isInCart(product.itemId);

  return (
    <div
      className={`${styles.card} ${
        variant === 'slider' ? styles.sliderCard : ''
      }`}
    >
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          className={styles.image}
          src={getAssetUrl(product.image)}
          alt={product.name}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.titleLink}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.fullPrice}>${product.fullPrice}</p>
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.addToCart} ${
            isProductInCart ? styles.addToCartActive : ''
          }`}
          onClick={() => addToCart(product)}
          disabled={isProductInCart}
        >
          {isProductInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteButton} ${
            isProductFavorite ? styles.favoriteButtonActive : ''
          }`}
          aria-label="Add to favourites"
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isProductFavorite ? favoritedActive : favouritesIcon}
            alt="favorite icon"
            className={styles.favoriteIcon}
          />
        </button>
      </div>
    </div>
  );
};
