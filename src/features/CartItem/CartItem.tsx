import { useContext } from 'react';
import { CloseIcon } from '../../shared/components/Icons/CloseIcon';
import { MinusIcon } from '../../shared/components/Icons/MinusIcon';
import { PlusIcon } from '../../shared/components/Icons/PlusIcon';
import { Product } from '../../shared/types/Product';
import styles from './CartItem.module.scss';
import { DispatchContext } from '../../Provider/GadgetsContext';
import classNames from 'classnames';

type Props = {
  item: Product & { quantity: number };
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);

  const totalAmount = item.quantity * item.price;

  const handleIncreaseQuantity = () => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: item.itemId, quantity: item.quantity + 1 },
    });
  };

  const handleDeccreaseQuantity = () => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: item.itemId, quantity: item.quantity - 1 },
    });
  };

  const handleRemoveItem = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.itemId });
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__top}>
        <button
          className={styles.cartItem__removeButton}
          onClick={handleRemoveItem}
        >
          <CloseIcon />
        </button>
        <img
          className={styles.cartItem__img}
          src={item.image}
          alt="item image"
        />
        <p className={styles.cartItem__name}>{item.name}</p>
      </div>
      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__quantity}>
          <button
            className={classNames(styles.button, styles.button__minus)}
            disabled={item.quantity === 1}
            onClick={handleDeccreaseQuantity}
          >
            <MinusIcon />
          </button>
          <p>{item.quantity}</p>
          <button
            className={classNames(styles.button, styles.button__plus)}
            onClick={handleIncreaseQuantity}
          >
            <PlusIcon />
          </button>
        </div>
        <h3 className={styles.cartItem__amount}>{`$${totalAmount}`}</h3>
      </div>
    </div>
  );
};
