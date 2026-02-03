import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import styles from './style.module.scss';

const CartIcon = () => {
  const getTotalItems = useCartStore(state => state.getTotalItems);
  const cartItemsCount = getTotalItems();

  return (
    <Link to="/cart" className={styles.cartIconLink}>
      <div className={styles.cartIconWrapper}>
        <img
          src="/img/icons/Shopping_bag_(Cart).svg"
          alt="Cart"
          className={styles.cartIcon}
        />

        {cartItemsCount > 0 && (
          <span className={styles.cartBadge}>
            {cartItemsCount > 99 ? '99+' : cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
