import { FC } from 'react';
import { Close } from '../../assets/icons/Close';
import { Minus } from '../../assets/icons/Minus';
import { Plus } from '../../assets/icons/Plus';
import styles from './CartItem.module.scss';
import { formatCurrency } from '../../helpers/utils';
import { CartItem } from '../../types/CartItem';

type Props = {
  item: CartItem;
  onRemove: (item: CartItem) => void;
  increase: (item: CartItem) => void;
  decrease: (item: CartItem) => void
};

export const CartProduct: FC<Props> = ({
  item,
  onRemove,
  increase,
  decrease,
}) => {
  return (
    <div className={styles.item}>
      <button
        type="button"
        data-cy="cartDeleteButton"
        className={styles.item__icon}
        onClick={() => onRemove(item)}
      >
        <Close />
      </button>
      <img
        className={styles.item__image}
        src={`/_new/${item.product.image}`}
        alt="product"
      />
      <div className={styles.item__text}>
        {item.product.name}
      </div>
      <div
        className={styles.item__cuantity}
        data-cy="productQauntity"
      >
        <button
          type="button"
          className={styles.item__cuantity__icon}
          onClick={() => decrease(item)}
        >
          <Minus />
        </button>
        <div className={styles.item__cuantity__count}>
          {item.quantity}
        </div>
        <button
          type="button"
          className={styles.item__cuantity__icon}
          onClick={() => increase(item)}
        >
          <Plus />
        </button>
      </div>

      <div
        className={styles.item__price}
      >
        {formatCurrency(item.product.price)}
      </div>
    </div>
  );
};
