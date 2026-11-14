import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = true,
}) => {
  const { addToCart, isInCart, toggleFavorite, isFavorite } = useStore();

  const added = isInCart(product.itemId);
  const favorited = isFavorite(product.itemId);
  const productUrl = `/product/${product.itemId}`;
  const imageSrc = `${import.meta.env.BASE_URL}${product.image}`;

  return (
    <article className={styles.card}>
      <Link to={productUrl} className={styles.card__imageLink}>
        <img src={imageSrc} alt={product.name} className={styles.card__image} />
      </Link>

      <Link to={productUrl} className={styles.card__title}>
        {product.name}
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        {showFullPrice && product.fullPrice > product.price && (
          <span className={styles.card__fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>Screen</span>
          <span className={styles.card__specValue}>{product.screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>Capacity</span>
          <span className={styles.card__specValue}>{product.capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specName}>RAM</span>
          <span className={styles.card__specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__buttons}>
        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={added}
          className={`${styles.card__addBtn} ${
            added ? styles['card__addBtn--added'] : ''
          }`}
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={`${styles.card__favBtn} ${
            favorited ? styles['card__favBtn--active'] : ''
          }`}
          aria-label="Toggle favorite"
        >
          {favorited ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
};
