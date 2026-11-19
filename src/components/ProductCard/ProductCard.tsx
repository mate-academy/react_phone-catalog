import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { getPublicUrl } from '../../utils/getPublicUrl';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard = ({ product, showFullPrice = false }: Props) => {
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();
  const isInFavorites = isFavorite(product.id);
  const isInCart = cartItems.some(item => item.product.id === product.id);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={getPublicUrl(product.image)}
          alt={product.name}
        />
      </Link>

      <h3 className={styles.title}>
        <Link to={`/product/${product.itemId}`} className={styles.titleLink}>
          {product.name}
        </Link>
      </h3>
      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>

        {showFullPrice && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={`${styles.addButton} ${
            isInCart ? styles.addButtonActive : ''
          }`}
          type="button"
          onClick={() => {
            if (isInCart) {
              removeFromCart(product.id);
            } else {
              addToCart(product);
            }
          }}
          aria-pressed={isInCart}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={`${styles.favoriteButton} ${
            isInFavorites ? styles.favoriteButtonActive : ''
          }`}
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-label={
            isInFavorites ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={isInFavorites}
        >
          <img
            className={styles.heartIcon}
            src={getPublicUrl(
              isInFavorites
                ? '/img/icon/heart-filled.svg'
                : theme === 'dark'
                  ? '/img/icon/heart-dark.svg'
                  : '/img/icon/heart.svg',
            )}
            alt=""
          />
        </button>
      </div>
    </article>
  );
};
