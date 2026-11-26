import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { IconHeart, IconHeartFilled } from '../Icons';
import type { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { assetUrl } from '../../utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const imageUrl = assetUrl(product.image);

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.imageLink}
        aria-label={product.name}
      >
        <img
          src={imageUrl}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.titleLink}
        aria-label={product.name}
      >
        <h3 className={styles.title}>{product.name}</h3>
      </Link>
      <div className={styles.price}>
        <span className={styles.currentPrice}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.originalPrice}>${product.fullPrice}</span>
        )}
      </div>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          className={classNames(styles.addToCartButton, {
            [styles.added]: inCart,
          })}
          onClick={handleAddToCart}
          disabled={inCart}
          aria-label={inCart ? 'Added to cart' : `Add ${product.name} to cart`}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.favoriteButton, {
            [styles.favorited]: favorite,
          })}
          onClick={handleToggleFavorite}
          aria-label={
            favorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={favorite}
        >
          {favorite ? <IconHeartFilled /> : <IconHeart />}
        </button>
      </div>
    </article>
  );
}
