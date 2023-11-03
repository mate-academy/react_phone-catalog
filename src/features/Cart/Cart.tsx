import { Icon } from '../../shared/Icon';
import styles from './Cart.module.scss';

export const Cart = () => {
  const total = 13;

  return (
    <Icon className={styles.icon} id="cart" count={total} />
  );
};
