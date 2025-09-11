import styles from './ProductCard.module.scss';
import { Item } from '../../types/Item';
import { Link } from 'react-router-dom';
import { ProductControls } from '../ProductControls/ProductControls';

type Props = {
  product: Item;
  isYouMayLike: boolean;
  isWideCard: boolean;
  isWithoutDescount: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isYouMayLike,
  isWideCard,
  isWithoutDescount,
}) => {
  return (
    <div
      className={`${styles.productCard} ${isYouMayLike && styles['productCard--youMayLike']} ${isWideCard && styles['productCard--wide']}`}
    >
      <div className={styles.productCard__head}>
        <Link to={`/${product.category}/${product.id}`} className={styles.productCard__photoLink}>
          <img
            src={`/public/${product.images[0]}`}
            alt="Product photo"
            className={`${styles.productCard__photo} ${isYouMayLike && styles['productCard__photo--youMayLike']}`}
          />
        </Link>

        <Link to={`/${product.category}/${product.id}`} className={styles.productCard__title}>
          {product.name}
        </Link>
      </div>

      <div className={styles.productCard__price}>
        <p className={styles.productCard__discount}>${product.priceDiscount}</p>

        {!isWithoutDescount && (
          <p className={styles.productCard__fullPrice}>${product.priceRegular}</p>
        )}
      </div>

      <div className={styles.productCard__description}>
        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>Screen</span>
          <span className={styles.productCard__descriptionValue}>{product.screen}</span>
        </div>

        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>Capacity</span>
          <span className={styles.productCard__descriptionValue}>{product.capacity}</span>
        </div>

        <div className={styles.productCard__descriptionItem}>
          <span className={styles.productCard__descriptionTitle}>RAM</span>
          <span className={styles.productCard__descriptionValue}>{product.ram}</span>
        </div>
      </div>

      <ProductControls
        product={product}
        isDetails={false}
        isYouMayLike={isYouMayLike}
        isWideCard={isWideCard}
      />
    </div>
  );
};
