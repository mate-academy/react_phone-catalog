import styles from './ProductCard.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../modules/shared/types/Product';
import { useCart } from '../../modules/shared/contexts/CartContext';
import { useFavorites } from '../../modules/shared/contexts/FavoritesContext';
type Props = {
  product: Product;
  showDiscount?: boolean;
};
export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const hasDiscount = showDiscount && product.fullPrice > product.price;

  const { isInCart, toggleCart } = useCart();
  const { isFavorite, toggleFavorites } = useFavorites();

  const isAddedToCart = isInCart(product.id);
  const isProductFavorite = isFavorite(product.id);

  return (
    <article className={styles.productCard}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCard__link}
      >
        <img
          src={product.image}
          alt="Product Image"
          className={styles.productCard__img}
        />
      </Link>
      <div className={styles.productCard__body}>
        <Link
          to={`/product/${product.itemId}`}
          className={styles.productCard__title}
        >
          {product.name}
        </Link>
        <div className={styles.productCard__price}>
          <span>${product.price}</span>
          {hasDiscount && (
            <span className={styles.productCard__discount}>
              ${product.fullPrice}
            </span>
          )}
        </div>
        <hr className={styles.productCard__divider} />
        <div className={styles.productCard__description}>
          <div className={styles.productCard__item}>
            <span className={styles.productCard__property}>Screen</span>
            <strong className={styles.productCard__value}>
              {product.screen}
            </strong>
          </div>
          <div className={styles.productCard__item}>
            <span className={styles.productCard__property}>Capacity</span>
            <strong className={styles.productCard__value}>
              {product.capacity}
            </strong>
          </div>
          <div className={styles.productCard__item}>
            <span className={styles.productCard__property}>RAM</span>
            <strong className={styles.productCard__value}>{product.ram}</strong>
          </div>
        </div>
        <div className={styles.productCard__control}>
          <button
            className={`${styles.productCard__addButton} ${
              isAddedToCart ? styles['productCard__addButton--active'] : ''
            }`}
            onClick={() => toggleCart(product)}
          >
            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className={styles.productCard__favoriteButton}
            onClick={() => toggleFavorites(product.id)}
          >
            {isProductFavorite ? (
              <img
                src="img/icons/favorite-filled.png"
                alt="Added to Favorites"
                className={`${styles.productCard__favoriteIcon} ${styles['productCard__favoriteIcon--active']}`}
              />
            ) : (
              <img
                src="img/icons/favorite.png"
                alt="Add to Favorites"
                className={styles.productCard__favoriteIcon}
              />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
