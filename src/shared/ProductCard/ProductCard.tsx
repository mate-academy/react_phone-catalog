import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../api/types';
import { formatMemory, formatPrice } from '../../shared/utils/format';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart, isFavorite, toggleFavorite } = useShop();

  const discount = (product.fullPrice ?? 0) - (product.price ?? 0);
  const isDiscount = discount > 0;
  const percent = isDiscount
    ? Math.round((discount / (product.fullPrice ?? 1)) * 100)
    : 0;
  const isAdded = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const price = formatPrice(product.price);
  const fullPrice = formatPrice(product.fullPrice);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
        />
        {isDiscount && <span className={styles.discount}>-{percent}%</span>}
      </Link>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.title}>
          {formatMemory(product.name)}
        </Link>
        <div className={styles.prices}>
          {price && <span className={styles.price}>{price}</span>}
          {fullPrice && <s className={styles.fullPrice}>{fullPrice}</s>}
        </div>
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
