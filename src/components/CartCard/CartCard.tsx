import styles from './CartCard.module.scss';
import Close from '../../../public/icons/close.svg?react';
import Minus from '../../../public/icons/minus.svg?react';
import Plus from '../../../public/icons/plus.svg?react';
import { CartProduct } from 'src/types/Types';
import cn from 'classnames';
import { useStoreContext } from 'src/context/StoreContext';

type Props = { cartProduct: CartProduct };

export const CartCard = ({ cartProduct }: Props) => {
  const { cartDispatch } = useStoreContext();

  return (
    <div className={styles.cartCard}>
      <div className={styles.productDetails}>
        <button
          className={styles.close}
          onClick={() => {
            cartDispatch({
              type: 'REMOVE_FROM_CART',
              payload: cartProduct.name,
            });
          }}
        >
          <Close className={styles.closeIcon} />
        </button>

        <img src={cartProduct.image} className={styles.image} />

        <p className={styles.productTitle}>{cartProduct.name}</p>
      </div>

      <div className={styles.productSummary}>
        <div className={styles.quantityControl}>
          <button
            onClick={() => {
              cartDispatch({
                type: 'DECREASE_QUANTITY',
                payload: cartProduct.name,
              });
            }}
            disabled={cartProduct.quantity === 1}
            className={cn(styles.decrease, styles.quantityButton)}
          >
            <Minus className={styles.minus} />
          </button>
          <p className={styles.quantity}>{cartProduct.quantity}</p>
          <button
            onClick={() => {
              cartDispatch({
                type: 'INCREASE_QUANTITY',
                payload: cartProduct.name,
              });
            }}
            className={cn(styles.increase, styles.quantityButton)}
          >
            <Plus className={styles.plus} />
          </button>
        </div>

        <p className={styles.itemsPrice}>
          ${cartProduct.price * cartProduct.quantity}
        </p>
      </div>
    </div>
  );
};
