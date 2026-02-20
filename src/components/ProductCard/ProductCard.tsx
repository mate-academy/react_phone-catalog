import styles from './ProductCard.module.scss';

import { Product } from '../../../public/api/types/Product';
import { Link } from 'react-router-dom';
import FavouritesLink from '../FavouritesLink/index';

type ProductCardProps = {
  product: Product;
  index: number;
  className?: string;
  handleAddToCart?: (product: Product) => void;
  handleToggleFavorite?: (productId: string) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  className,
  handleAddToCart,
  handleToggleFavorite,
}) => {
  const visibleOnTablet = 2;
  const visibleOnDesktop = 4;

  return (
    <div
      className={`${styles.productCard} ${styles.product} ${className ?? ''}
                      ${index === 1 ? styles.mobile : ''}
                      ${index > 1 && index <= visibleOnTablet ? styles.tablet : ''}
                      ${index <= visibleOnDesktop ? styles.desktop : ''}`}
    >
      <div className={styles.productCard__productInfo}>
        <div className={styles.productCard__productImageContainer}>
          <img
            src={product?.image}
            alt={product?.name ?? 'Product Image'}
            className={styles.productCard__productImage}
          />
        </div>
        <Link
          to={`/product/${product?.id}`}
          className={styles.productCard__productName}
        >
          {product?.name}
        </Link>
        <div className={styles.productPriceRow}>
          <p className={styles.productCard__productPrice}>
            <a>${product?.price}&nbsp;</a>
          </p>
          <p className={styles.productCard__productFullPrice}>
            {`$${product?.fullPrice}`}
          </p>
        </div>
        <div className={styles.productCard__productInfoTable}>
          <div className={styles.productFeature}>Screen</div>
          <div className={styles.productValue}>{product?.screen}</div>
          <div className={styles.productFeature}>Capacity</div>
          <div className={styles.productValue}>{product?.capacity}</div>
          <div className={styles.productFeature}>RAM</div>
          <div className={styles.productValue}>{product?.ram}</div>
        </div>

        <div className={styles.productCard__bottom}>
          <button
            type="button"
            aria-label="Add to cart"
            className={`${styles.button} ${styles['button--add-to-card']}`}
            onClick={() => handleAddToCart?.(product)}
          >
            Add to cart
          </button>
          <button
            type="button"
            aria-label="Add to Favourites"
            className={`${styles['button--favourites']}`}
            onClick={() => handleToggleFavorite?.(product.id)}
          >
            <FavouritesLink
              className={`${styles.icon}  ${styles['icon--wide']} ${styles['icon--favourites']}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
