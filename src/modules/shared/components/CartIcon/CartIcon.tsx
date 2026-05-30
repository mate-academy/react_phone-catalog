import { useCart } from '../../../../contexts';
import styles from './CartIcon.module.scss';

export const CartIcon = () => {
  const { getTotalCount } = useCart();
  const count = getTotalCount();

  return (
    <a href="#/cart" className={styles.cartIcon}>
      <span className="icon icon__cart" />
      {count > 0 && <span className={styles.cartIconBadge}>{count}</span>}
    </a>
  );
};
