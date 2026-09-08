import { BASE_URL } from '../../utils/constants';
import { Title } from '../Title';
import styles from './CartIsEmpty.module.scss';

export const CartIsEmpty = () => {
  return (
    <div className={styles.cartIsEmpty}>
      <div className={styles.cartIsEmpty__container}>
        <Title level={2}>Your cart is empty</Title>
        <img
          src={`${BASE_URL}/img/cart-is-empty.png`}
          alt="not found image"
          className={styles.cartIsEmpty__image}
        />
      </div>
    </div>
  );
};
