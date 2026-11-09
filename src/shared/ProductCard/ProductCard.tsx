import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../api/types';
import {
  formatMemory,
  formatPrice,
  getProductPrice,
} from '../../shared/utils/format';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart, isFavorite, toggleFavorite } = useShop();

  const unitPrice = getProductPrice(product);
  const fullPriceValue =
    product.fullPrice ?? product.priceRegular ?? product.priceDiscount;
  const isAdded = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const price = formatPrice(unitPrice);
  const fullPrice = formatPrice(fullPriceValue);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
        />
      </Link>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {formatMemory(product.name)}
        </Link>
        <div className={styles.prices}>
          {price && <span className={styles.price}>{price}</span>}
          {fullPrice && <s className={styles.fullPrice}>{fullPrice}</s>}
        </div>
        {(product.screen || product.capacity || product.ram) && (
          <dl className={styles.specs}>
            {product.screen && (
              <div className={styles.specRow}>
                <dt>Screen</dt>
                <dd>{product.screen}</dd>
              </div>
            )}
            {product.capacity && (
              <div className={styles.specRow}>
                <dt>Capacity</dt>
                <dd>{formatMemory(product.capacity)}</dd>
              </div>
            )}
            {product.ram && (
              <div className={styles.specRow}>
                <dt>RAM</dt>
                <dd>{formatMemory(product.ram)}</dd>
              </div>
            )}
          </dl>
        )}
        <div className={styles.actions}>
          <button
            type="button"
            className={
              isAdded
                ? `${styles.cartButton} ${styles.added}`
                : styles.cartButton
            }
            onClick={() => addToCart(product)}
          >
            {isAdded ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={styles.favoriteButton}
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={favorite ? 'fas fa-heart' : 'far fa-heart'} />
          </button>
        </div>
      </div>
    </article>
  );
};
