import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  onToggleFavourite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isFavourite: boolean;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  onToggleFavourite,
  onAddToCart,
  isFavourite,
  showDiscount = false,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </Link>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{product.name}</h3>
        </div>
        <div className={styles.priceBlock}>
          {showDiscount ? (
            <div className={styles.priceRow}>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.oldPrice}>${product.fullPrice}</span>
            </div>
          ) : (
            <span className={styles.price}>${product.fullPrice}</span>
          )}
        </div>
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
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.addToCart}
            onClick={() => onAddToCart(product)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={`${styles.favouriteButton} ${
              isFavourite ? styles.favouriteButtonActive : ''
            }`}
            aria-label="Add to favourites"
            onClick={() => onToggleFavourite(product)}
          >
            <img
              src={
                isFavourite
                  ? '/img/icon/favourites-red.svg'
                  : '/img/icon/favourites-logo.svg'
              }
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};
