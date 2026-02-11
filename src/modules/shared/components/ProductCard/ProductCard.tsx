import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotification } from '../../context/NotificationContext';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  hotPrice: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, hotPrice = false }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { notify } = useNotification();

  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  const handleAddToCart = () => {
    if (inCart) {
      notify('Already in cart', 'error');

      return;
    }

    addToCart(product);
    notify('Added to cart', 'success');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.itemId);
    notify(
      favorite ? 'Removed from favorites' : 'Added to favorites',
      favorite ? 'error' : 'success',
    );
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
        <img src={`/${product.image}`} alt={product.name} />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price.toLocaleString()}</span>
        {hotPrice && (
          <span className={styles.fullPrice}>
            ${product.fullPrice.toLocaleString()}
          </span>
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <span className={styles.label}>Screen</span>
          <span className={styles.value}>{product.screen}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.label}>Capacity</span>
          <span className={styles.value}>{product.capacity}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.label}>RAM</span>
          <span className={styles.value}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.cartButton, { [styles.added]: inCart })}
          onClick={handleAddToCart}
          disabled={inCart}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          aria-label="Add to favorites"
          className={classNames(styles.favButton, {
            [styles.favActive]: favorite,
          })}
          onClick={handleToggleFavorite}
        >
          <i
            className={classNames('fa-heart', {
              'fa-regular': !favorite,
              'fa-solid': favorite,
            })}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
};
