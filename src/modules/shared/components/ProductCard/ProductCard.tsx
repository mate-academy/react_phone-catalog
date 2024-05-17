import { Product } from 'modules/shared/types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={product.image} alt={product.name} />
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.title}>{product.name}</h2>

        <div className={styles.priceWrapper}>
          <p className={styles.productPrice}>${product.price}</p>

          {showDiscount && (
            <p className={styles.productDiscount}>{`$${product.fullPrice}`}</p>
          )}
        </div>

        <div className={styles.divider}></div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureName}>Screen</span>
            <span className={styles.featureValue}>{product.screen}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureName}>Capacity</span>
            <span className={styles.featureValue}>{product.capacity}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureName}>RAM</span>
            <span className={styles.featureValue}>{product.ram}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.addToCart}>Add to cart</button>
          <button className={styles.favourite}>
            <img src="img/icons/heart.svg" alt="favourite" />
          </button>
        </div>
      </div>
    </div>
  );
};
