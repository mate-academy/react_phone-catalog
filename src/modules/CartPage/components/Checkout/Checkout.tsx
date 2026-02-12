import classNames from 'classnames';
import { useAppSelector } from '../../../../app/hooks';
import styles from './Checkout.module.scss';

type Props = {
  onClick: () => void;
};

export const Checkout: React.FC<Props> = ({ onClick }) => {
  const totalPrice = useAppSelector(state => state.cart.totalPrice);
  const cart = useAppSelector(state => state.cart.cart);
  const totalCount = cart.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div
      className={classNames(styles.Checkout, {
        hidden: cart.length === 0,
      })}
    >
      <p className={styles.Checkout__price}>{`$${totalPrice}`}</p>

      <p
        className={styles.Checkout__count}
      >{`Total for ${totalCount} items`}</p>

      <hr />

      <button className={styles.Checkout__btn} onClick={onClick}>
        Checkout
      </button>
    </div>
  );
};
