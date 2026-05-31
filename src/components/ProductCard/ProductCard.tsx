import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { formatCurrency } from '../../utils/format';
import { Product } from '../../types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const productId = product.itemId || product.id;
  const inCart = isInCart(productId || '');
  const favorite = productId ? isFavorite(productId) : false;
  const link = `/product/${productId}`;
  const price =
    product.price ?? product.priceDiscount ?? product.priceRegular ?? 0;
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
          {product.color && <span>{product.color}</span>}
          {product.capacity && <span>{product.capacity}</span>}
        </div>
        <div className={styles.priceBlock}>
          <strong>{formatCurrency(price)}</strong>
          {oldPrice > price && <span>{formatCurrency(oldPrice)}</span>}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.cartButton}
            onClick={toggleCart}
          >
            {inCart ? 'Remove from cart' : 'Add to cart'}
          </button>
          {productId && (
            <button
              type="button"
              className={styles.favoriteButton}
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
