import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/Product';
import { assetUrl } from '../../utils/assets';
import { Icon } from '../Icon';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { cart, favorites, addToCart, toggleFavorite } = useShop();
  const isInCart = cart.some(item => item.product.itemId === product.itemId);
  const isFavorite = favorites.some(item => item.itemId === product.itemId);
  const productLink = `/product/${product.itemId}`;

  return (
    <article className={styles.card}>
      <Link
        className={styles.imageLink}
        to={productLink}
        aria-label={`View ${product.name}`}
        tabIndex={-1}
      >
        <img
          className={styles.image}
          src={assetUrl(product.image)}
          alt={product.name}
          loading="lazy"
          width="208"
          height="196"
        />
      </Link>

      <Link className={styles.name} to={productLink}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>
          ${showDiscount ? product.price : product.fullPrice}
        </span>
        {showDiscount && product.fullPrice > product.price && (
          <s className={styles.originalPrice}>${product.fullPrice}</s>
        )}
      </div>

      <dl className={styles.specs}>
        <div>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>
        <div>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>
        <div>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          className={`primary-button ${styles.cartButton} ${isInCart ? styles.added : ''}`}
          type="button"
          onClick={() => {
            if (!isInCart) {
              addToCart(product);
            }
          }}
          aria-label={`${isInCart ? 'Added to cart' : 'Add to cart'}: ${product.name}`}
          aria-disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={`icon-button ${styles.favorite} ${isFavorite ? styles.selected : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`}
          aria-pressed={isFavorite}
        >
          <Icon name="heart" filled={isFavorite} />
        </button>
      </div>
    </article>
  );
};
