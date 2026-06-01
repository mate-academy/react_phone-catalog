import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { formatCurrency } from '../../utils/format';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({
  product,
  showDiscount = true,
}: ProductCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const productId = product.itemId || product.id;
  const inCart = isInCart(productId || '');
  const favorite = productId ? isFavorite(productId) : false;
  const link = `/product/${productId}`;
  const price = showDiscount
    ? (product.price ?? product.priceDiscount ?? product.priceRegular ?? 0)
    : (product.fullPrice ??
      product.priceRegular ??
      product.price ??
      product.priceDiscount ??
      0);
  const oldPrice = product.fullPrice ?? product.priceRegular ?? 0;
  const toggleCart = () => {
    if (!productId) {
      return;
    }

    if (inCart) {
      removeFromCart(productId);

      return;
    }

    addToCart(product);
  };

  return (
    <article className={styles.card}>
      <Link to={link} className={styles.preview}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </Link>
      <div className={styles.body}>
        <Link to={link} className={styles.title}>
          {product.name}
        </Link>
        <div className={styles.meta}>
          <div>
            <span>Screen</span>
            <strong>{product.screen ?? '-'}</strong>
          </div>
          <div>
            <span>Capacity</span>
            <strong>{product.capacity ?? '-'}</strong>
          </div>
          <div>
            <span>RAM</span>
            <strong>{product.ram ?? '-'}</strong>
          </div>
        </div>
        <div className={styles.priceBlock}>
          <strong>{formatCurrency(price)}</strong>
          {showDiscount && oldPrice > price && (
            <span>{formatCurrency(oldPrice)}</span>
          )}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.cartButton} ${
              inCart ? styles.cartButtonActive : ''
            }`}
            onClick={toggleCart}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>
          {productId && (
            <button
              type="button"
              className={`${styles.favoriteButton} ${
                favorite ? styles.favoriteButtonActive : ''
              }`}
              onClick={() => toggleFavorite(productId)}
              aria-label={
                favorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <i
                className={
                  favorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                }
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
