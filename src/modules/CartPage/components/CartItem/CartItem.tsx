import { GoDash, GoPlus } from 'react-icons/go';

import Button from '../../../../UI/Buttons/Button';
import { FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Product from '../../../../types/Product';
import { ROUTES } from '../../../../constants/ROUTES';
import classNames from 'classnames';
import styles from './CartItem.module.css';

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

  const pathToDetailInfo =
    `/${product.category}/` + ROUTES.PRODUCT_DETAIL.replace(':productId', id);

  return (
    <div className={styles.cartItem}>
      <div className={styles.leftSide}>
        <Button
          variant="ghost"
          className={styles.closeBtn}
          aria-label="Delete button"
          onClick={() => onDelete(id)}
        >
          <IoCloseOutline size={18} />
        </Button>

        <Link to={pathToDetailInfo} className={styles.imgWrapper}>
          <img src={images[0]} alt={name} className={styles.img} />
        </Link>
        <Link to={pathToDetailInfo} className={styles.descrWrapper}>
          <span className={styles.descr}>{name}</span>
        </Link>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.actionsList}>
          <Button
            variant="icon"
            size={[32, 32]}
            className={classNames('', {
              [styles.actionBtnDisabled]: quantity === 1,
            })}
            disabled={quantity === 1}
            onClick={() => (quantity === 1 ? null : onMinus(id))}
            aria-label="Add button"
          >
            <GoDash size={16} />
          </Button>
          <span className={styles.counter}>{quantity}</span>
          <Button
            variant="icon"
            size={[32, 32]}
            onClick={() => onPlus(id)}
            aria-label="Remove button"
          >
            <GoPlus size={16} />
          </Button>
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
