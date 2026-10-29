import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import type { Product } from '../../types/Product';
import { formatMemory } from '../../utils/formatMemory';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, showDiscount = false }: Props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isLiked = isFavorite(product.itemId);

  const { addToCart, isInCart } = useCart();
  const isAdded = isInCart(product.itemId);

  const productLink = `/product/${product.itemId}`;

  return (
    <article className={styles.card}>
      <Link to={productLink} className={styles.imageLink}>
        <img className={styles.image} src={product.image} alt={product.name} />
      </Link>

      <h3 className={styles.title}>
        <Link to={productLink} className={styles.titleLink}>
          {product.name}
        </Link>
      </h3>

      <p className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {showDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </p>

      <div className={styles.specs}>
        <p className={styles.spec}>
          <span className={styles.specName}>Screen</span>
          <span>{product.screen}</span>
        </p>
        <p className={styles.spec}>
          <span className={styles.specName}>Capacity</span>
          <span>{formatMemory(product.capacity)}</span>
        </p>
        <p className={styles.spec}>
          <span className={styles.specName}>RAM</span>
          <span>{formatMemory(product.ram)}</span>
        </p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={
            isAdded
              ? `${styles.addButton} ${styles.addButtonAdded}`
              : styles.addButton
          }
          disabled={isAdded}
          onClick={() => addToCart(product)}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={styles.favoriteButton}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isLiked}
          onClick={() => toggleFavorite(product)}
        >
          <img
            src={isLiked ? 'img/icons/heart-like.svg' : 'img/icons/heart.svg'}
            alt=""
            width="16"
            height="16"
          />
        </button>
      </div>
    </article>
  );
};
