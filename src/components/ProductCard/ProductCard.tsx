import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <a href="#" className={styles.imageLink}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </a>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{product.name}</h3>
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.price}>${product.fullPrice}</span>
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
          <button type="button" className={styles.addToCart}>
            Add to cart
          </button>
          <button
            type="button"
            className={styles.favouriteButton}
            aria-label="Add to favourites"
          >
            <img src="/img/icon/favourites-logo.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
