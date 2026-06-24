import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/catalog';
import { normalizeImagePath } from '../../utils/category';
import styles from './ProductCard.module.scss';

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, isFavorite, isInCart, toggleFavorite } = useShop();
  const favorite = isFavorite(product.itemId);
  const inCart = isInCart(product.itemId);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={normalizeImagePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.divider} />

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
          className={`${styles.button} ${styles.cartButton} ${inCart ? styles.cartButtonAdded : ''}`.trim()}
          onClick={() => addToCart(product.itemId)}
          disabled={inCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`.trim()}
          onClick={() => toggleFavorite(product.itemId)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
};
