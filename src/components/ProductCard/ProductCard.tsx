import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Icon } from '../Icon/Icon';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

const getImageUrl = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('public/')
    ? path.replace('public/', '')
    : path;

  return baseUrl.endsWith('/')
    ? `${baseUrl}${cleanPath}`
    : `${baseUrl}/${cleanPath}`;
};

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

  const hasDiscount = showDiscount && fullPrice > price;
  const displayPrice = showDiscount ? price : fullPrice;

  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(itemId);

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(itemId);

  const handleAddToCart = () => {
    if (inCart) {
      removeFromCart(itemId);
    } else {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img src={getImageUrl(image)} alt={name} className={styles.image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.name}>
        {name}
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>{formatPrice(displayPrice)}</span>

        {hasDiscount && (
          <span className={styles.fullPrice}>{formatPrice(fullPrice)}</span>
        )}
      </div>

      <div className={styles.divider} />

      <dl className={styles.specs}>
        <div className={styles.specsRow}>
          <dt className={styles.specsLabel}>Screen</dt>
          <dd className={styles.specsValue}>{screen}</dd>
        </div>

        <div className={styles.specsRow}>
          <dt className={styles.specsLabel}>Capacity</dt>
          <dd className={styles.specsValue}>{capacity}</dd>
        </div>

        <div className={styles.specsRow}>
          <dt className={styles.specsLabel}>RAM</dt>
          <dd className={styles.specsValue}>{ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.addToCartButton} ${inCart ? styles.added : ''}`}
          onClick={handleAddToCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
          onClick={handleToggleFavorite}
          aria-label="Add to favorites"
        >
          <Icon name={favorite ? 'heartFilled' : 'heart'} />
        </button>
      </div>
    </div>
  );
};
