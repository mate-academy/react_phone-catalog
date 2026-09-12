import type { Product } from '../../../../types/Product';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeartIcon, HeartFilledIcon } from '../Icons/Icons';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  /** Brand new models are shown at full price, without an old price. */
  withDiscount?: boolean;
};

export const ProductCard = ({ product, withDiscount = true }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const inCart = isInCart(product.itemId);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={product.name}
          loading="lazy"
        />
      </Link>

      <h2>
        <Link to={`/product/${product.itemId}`}>{product.name}</Link>
      </h2>

      <p className={styles.priceRow}>
        <strong>${withDiscount ? product.price : product.fullPrice}</strong>
        {withDiscount && product.fullPrice !== product.price && (
          <del>${product.fullPrice}</del>
        )}
      </p>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${inCart ? styles.buttonActive : ''}`}
          disabled={inCart}
          onClick={() => addToCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={`${styles.favorite} ${
            isFavorite(product.itemId) ? styles.favoriteActive : ''
          }`}
          aria-label="Toggle favorite"
          aria-pressed={isFavorite(product.itemId)}
          onClick={() => toggleFavorite(product)}
        >
          {isFavorite(product.itemId) ? (
            <HeartFilledIcon size={16} />
          ) : (
            <HeartIcon size={16} />
          )}
        </button>
      </div>
    </article>
  );
};
