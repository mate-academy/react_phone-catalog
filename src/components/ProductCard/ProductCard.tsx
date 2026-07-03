import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { getAssetUrl } from '../../utils/helpers';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const { itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  const inCart = isInCart(itemId);
  const favorited = isFavorite(product.id);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inCart) {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className={styles.card} data-testid="product-card">
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={getAssetUrl(image)} alt={name} loading="lazy" />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.titleLink}>
        {name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.priceDiscount}>${price}</span>
        {price !== fullPrice && (
          <span className={styles.priceRegular}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specVal}>{screen}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specVal}>{capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specVal}>{ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={handleCartClick}
          className={`${styles.btnCart} ${inCart ? styles.btnCartActive : ''}`}
          aria-label={inCart ? 'Added to cart' : 'Add to cart'}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`${styles.btnFavorite} ${favorited ? styles.btnFavoriteActive : ''}`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i
            className={favorited ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
          />
        </button>
      </div>
    </div>
  );
};
