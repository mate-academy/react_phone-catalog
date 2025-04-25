import { Product } from '../../types/product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.card__img}
        src={product.image}
        alt={`${product.name} img`}
      />
      <p className={`body--text ${styles.card__title}`}>{product.name}</p>
      <span className={styles.card__priceWrap}>
        <h3>{`$${product.price}`}</h3>
        <h3 className={styles.card__salePrice}>{`$${product.fullPrice}`}</h3>
      </span>

      <div className={styles.card__descriptionContainer}>
        <div className={styles['card__descriptionContainer--item']}>
          <p
            className="small--text"
            style={{ color: 'rgba(137, 147, 154, 1)' }}
          >
            Screen
          </p>
          <p className={styles['card__descriptionContainer--specsText']}>
            {product.screen}
          </p>
        </div>
        <div className={styles['card__descriptionContainer--item']}>
          <p
            className="small--text"
            style={{ color: 'rgba(137, 147, 154, 1)' }}
          >
            Capacity
          </p>
          <p className={styles['card__descriptionContainer--specsText']}>
            {product.capacity}
          </p>
        </div>
        <div className={styles['card__descriptionContainer--item']}>
          <p
            className="small--text"
            style={{ color: 'rgba(137, 147, 154, 1)' }}
          >
            RAM
          </p>
          <p className={styles['card__descriptionContainer--specsText']}>
            {product.ram}
          </p>
        </div>
      </div>
      <div className={styles.card__buttons}>
        <button className={styles.card__add}>Add to cart</button>
        <div className={styles.iconWrap}>
          <img src="public/img/icons/heart.svg" alt="Heart Icon" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
