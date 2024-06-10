import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.css';
import classNames from 'classnames';
import { ROUTES } from '../../../../constants/ROUTES';
import Product from '../../../../types/Product';

interface Props {
  product: Product;
  quantity: number;
  onDelete: (id: string) => void;
  onMinus: (id: string) => void;
  onPlus: (id: string) => void;
}

const CartItem: FC<Props> = ({
  product,
  quantity,
  onDelete,
  onPlus,
  onMinus,
}) => {
  const { images, name, id, priceRegular, priceDiscount } = product;
  const pathToDetailInfo = ROUTES.PRODUCT_DETAIL.replace(':productId', id);

  return (
    <div className={styles.cartItem}>
      <div className={styles.leftSide}>
        <button
          className={styles.closeBtn}
          aria-label="Delete button"
          onClick={() => onDelete(id)}
        ></button>

        <Link to={pathToDetailInfo} className={styles.imgWrapper}>
          <img src={images[0]} alt={name} className={styles.img} />
        </Link>
        <Link to={pathToDetailInfo} className={styles.descrWrapper}>
          <span className={styles.descr}>{name}</span>
        </Link>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.actionsList}>
          <button
            className={classNames(
              `${styles.actionBtn}`,
              `${styles.actionBtnMinus}`,
              {
                [styles.actionBtnDisabled]: quantity === 1,
              },
            )}
            disabled={quantity === 1}
            onClick={() => (quantity === 1 ? null : onMinus(id))}
            aria-label="Add button"
          ></button>
          <span className={styles.counter}>{quantity}</span>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnPlus}`}
            onClick={() => onPlus(id)}
            aria-label="Remove button"
          ></button>
        </div>

        <p className={styles.price}>
          $
          {!!priceDiscount ? priceDiscount * quantity : priceRegular * quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
