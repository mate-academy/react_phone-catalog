import React from 'react';
import { Product } from '../../../types';
import styles from './ProductCard.module.scss';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';

type Props = {
  product: Product;
  showFullPriceOnly?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPriceOnly = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.cardLink}
      >
        <div className={styles.imageWrapper}>
          <img src={`${product.image}`} alt="image" className={styles.image} />
        </div>

        <p className={styles.name}>{product.name}</p>

        <div className={styles.priceBlock}>
          <p className={styles.price}>
            ${showFullPriceOnly ? product.fullPrice : product.price}
          </p>
          {!showFullPriceOnly && (
            <p className={styles.fullPrice}>${product.fullPrice}</p>
          )}
        </div>

        <div className={styles.line}></div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specName}>Screen</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>

          <div className={styles.spec}>
            <span className={styles.specName}>Capacity</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>

          <div className={styles.spec}>
            <span className={styles.specName}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
        </div>
      </Link>

      <div className={styles.bottom}>
        <button
          className={
            isInCart(product.id)
              ? isHovered
                ? styles.btnRemove
                : styles.btnAdded
              : styles.btnAddToCart
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (isInCart(product.id)) {
              removeFromCart(product.id);
              showToast('Removed from cart');
            } else {
              addToCart(product, () => showToast('Added to cart'));
            }
          }}
        >
          {isInCart(product.id)
            ? isHovered
              ? 'Remove from cart'
              : 'Added'
            : 'Add to cart'}
        </button>

        <button
          className={styles.btnFavorites}
          onClick={() =>
            toggleFavorite(product, added =>
              showToast(
                added ? 'Added to favorites' : 'Removed from favorites',
              ),
            )
          }
        >
          <img
            src={
              isFavorite(product.id)
                ? 'img/icons/heart-filled.svg'
                : 'img/icons/heart.svg'
            }
            alt="Favorites"
            className={styles.favorites}
          />
        </button>
      </div>
    </div>
  );
};
