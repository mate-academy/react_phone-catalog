import { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../UI/Buttons/Button';
import { ROUTES } from '../../../constants/ROUTES';
import Product from '../../../types/Product';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
  isBrandNew?: boolean;
}

const ProductCard: FC<Props> = ({ product, isBrandNew = false }) => {
  const {
    images,
    name,
    priceDiscount,
    priceRegular,
    screen,
    capacity,
    ram,
    id,
  } = product;

  return (
    <article className={styles.wrapper}>
      <div className={styles.header}>
        <Link
          to={ROUTES.PRODUCT_DETAIL.replace(':productId', id)}
          className={styles.imgWrapper}
        >
          <img src={images[0]} alt={name} className={styles.image} />
        </Link>
        <Link
          to={ROUTES.PRODUCT_DETAIL.replace(':productId', id)}
          className={styles.descr}
        >
          {name}
        </Link>
        <p className={styles.prices}>
          <span className={styles.newPrice}>${priceDiscount}</span>
          {!isBrandNew && (
            <span className={styles.oldPrice}>${priceRegular}</span>
          )}
        </p>
      </div>

      <ul className={styles.paramsList}>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Screen</span>
          <span className={styles.paramValue}>{screen}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>Capacity</span>
          <span className={styles.paramValue}>{capacity}</span>
        </li>
        <li className={styles.paramItem}>
          <span className={styles.paramType}>RAM</span>
          <span className={styles.paramValue}>{ram}</span>
        </li>
      </ul>

      <div className={styles.actionsWrapper}>
        <Button variant="primary" size="100%" isSelected={false}>
          Add to cart
        </Button>
        <Button variant="icon" size="40px">
          <img src="img/icons/favorite-icon.svg" alt="" />
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
