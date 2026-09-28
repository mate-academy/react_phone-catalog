import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { normalizePath } from '../../api/products';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  hasDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = false,
}) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isInCart = cart.some(item => item.product.id === product.id);
  const favorite = isFavorite(product.id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const showDiscount =
    hasDiscount && product.fullPrice && product.fullPrice > product.price;

  return (
    <div className={styles.card} data-cy="productCard">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageLink}
      >
        <img
          src={normalizePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.title}
      >
        {product.name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>
        {showDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cartButton} ${isInCart ? styles.added : ''}`}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favButton} ${favorite ? styles.active : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label="favorite"
        >
          <span className={favorite ? styles.favIconActive : styles.favIcon} />
        </button>
      </div>
    </div>
  );
};
