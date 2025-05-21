import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import AddButtons from '../AddButtons';
import { Product } from '../../../../types/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          className={styles.card__img}
          src={product.image}
          alt={`${product.name} img`}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={`body--text ${styles.card__title}`}
      >
        {product.name}
      </Link>
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
      <AddButtons product={product} />
    </div>
  );
};

export default ProductCard;
