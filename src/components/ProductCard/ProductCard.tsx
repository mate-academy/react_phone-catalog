import { Link } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';
import { Product } from '../../types/Product';
import { imagePath } from '../../utils/imagePath';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
  limitedDiscounts?: boolean;
};

export const ProductCard = ({
  product,
  showDiscount = true,
  limitedDiscounts = false,
}: Props) => {
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShop();

  const addedToCart = isInCart(product.itemId);
  const addedToFavorites = isFavorite(product.itemId);

  const handleAddToCart = () => {
    if (!addedToCart) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const hasDiscount =
    showDiscount &&
    (!limitedDiscounts || product.id % 4 === 0) &&
    product.price < product.fullPrice;

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={imagePath(product.image)}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>
          ${hasDiscount ? product.price : product.fullPrice}
        </span>

        {hasDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

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
          onClick={handleAddToCart}
          disabled={addedToCart}
          className={`${styles.addButton}
          ${addedToCart ? styles.addedButton : ''}`}
        >
          {addedToCart ? (
            <>
              <span className={styles.addedDesktop}>Added to cart</span>
              <span className={styles.addedMobile}>Added</span>
            </>
          ) : (
            'Add to cart'
          )}
        </button>

        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`${styles.favoriteButton}
          ${addedToFavorites ? styles.favoriteActive : ''}`}
          aria-label={
            addedToFavorites ? 'Remove from favorites' : 'Add to favorites'
          }
          aria-pressed={addedToFavorites}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={addedToFavorites ? '#eb5757' : 'none'}
            stroke={addedToFavorites ? '#eb5757' : '#313237'}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d="M8 14.2 2.1 8.4C-1.3 5 3.4-.1 7.2 3.3L8
             4l.8-.7c3.8-3.4 8.5 1.7 5.1 5.1L8 14.2Z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};
