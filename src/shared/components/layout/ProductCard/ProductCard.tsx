import { Link } from 'react-router-dom';

import { AddToCartButton } from 'shared/components/ui/AddToCartButton';
import { FavoriteButton } from 'shared/components/ui/FavoriteButton';
import { Product } from 'shared/types/Product';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  return (
    <div className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.imageWrapper}
      >
        <img className={styles.image} src={product.image} alt={product.name} />
      </Link>

      <div className={styles.productInfo}>
        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.title}
        >
          {product.name}
        </Link>

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
          <AddToCartButton />

          <FavoriteButton />
        </div>
      </div>
    </div>
  );
};
