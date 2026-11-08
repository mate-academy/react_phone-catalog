import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
// eslint-disable-next-line max-len
import { useFavorites } from '../../context/Favoritescontext/Favoritescontext';
import { useCart } from '../../context/CartContext/CartContext';

interface Product {
  id: string;
  category?: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  capacity: string;
  ram: string;
}

interface Props {
  product: Product;
  showOldPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  showOldPrice = true,
}) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const isAdded = isInCart(product.id);

  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(product.id);

  return (
    <Link
      to={`/${product.category ?? 'phones'}/${product.id}`}
      className={styles.card}
    >
      <img
        src={`/${product.images[0]}`}
        alt={product.name}
        className={styles.cardImage}
      />
      <p className={styles.cardName}>{product.name}</p>

      <div className={styles.priceContainer}>
        <span className={styles.priceDiscount}>
          {`$${product.priceDiscount}`}
        </span>

        {showOldPrice && product.priceRegular !== product.priceDiscount && (
          <span className={styles.priceRegular}>
            {`$${product.priceRegular}`}
          </span>
        )}
      </div>

      <hr className={styles.cardLine} />

      <div className={styles.specsContainer}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>
            {product.screen.split(' (')[0].trim()}
          </span>
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
      <div className={styles.cardButton}>
        <button
          className={`${styles.addToCard} ${isAdded ? styles.added : ''}`}
          onClick={e => {
            e.preventDefault();

            if (isAdded) {
              removeFromCart(product.id);
            } else {
              addToCart(product.id);
            }
          }}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.cardHeart}
          aria-label={isLiked ? 'Remove from favourites' : 'Add to favourites'}
          onClick={e => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
        >
          <img
            src={
              isLiked ? '/img/icons/heart-filled.svg' : '/img/icons/heart.svg'
            }
            alt=""
          />
        </button>
      </div>
    </Link>
  );
};
