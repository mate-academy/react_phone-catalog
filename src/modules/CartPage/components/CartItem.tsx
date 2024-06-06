import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.css';
import Product from '../../../types/Product';
import { ROUTES } from '../../../constants/ROUTES';
import classNames from 'classnames';

interface Props {
  product: Product;
  onDelete: (id: string) => void;
  onMinus: (id: string) => void;
  onPlus: (id: string) => void;
}

const DEFAULT_COUNTER_VALUE = 1;

const CartItem: FC<Props> = ({ product, onDelete, onPlus, onMinus }) => {
  const [counter, setCounter] = useState(DEFAULT_COUNTER_VALUE); // Temp solution
  const [isDisabled, setIsDisabled] = useState(
    () => counter === DEFAULT_COUNTER_VALUE,
  );
  const { images, name, id, priceRegular, priceDiscount } = product;
  const pathToDetailInfo = ROUTES.PRODUCT_DETAIL.replace(':productId', id);

  const handleMinus = (idToMinus: string) => {
    setCounter(current => {
      const copyCurrent = current - 1;

      if (copyCurrent === 1) {
        setIsDisabled(true);
      }

      return copyCurrent;
    });
    onMinus(idToMinus);
  };

  const handlePlus = (idToPlus: string) => {
    setCounter(current => current + 1);
    setIsDisabled(false);
    onPlus(idToPlus);
  };

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
                [styles.actionBtnDisabled]: isDisabled,
              },
            )}
            disabled={isDisabled}
            onClick={() => handleMinus(id)}
            aria-label="Add button"
          ></button>
          <span className={styles.counter}>{counter}</span>
          <button
            className={`${styles.actionBtn} ${styles.actionBtnPlus}`}
            onClick={() => handlePlus(id)}
            aria-label="Remove button"
          ></button>
        </div>

        <p className={styles.price}>
          ${!!priceDiscount ? priceDiscount * counter : priceRegular * counter}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
