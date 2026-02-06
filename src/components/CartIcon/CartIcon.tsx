import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { selectTotalItems } from '../../store/slices/cartSlice';
import styles from './style.module.scss';

const CartIcon = () => {
  const cartItemsCount = useAppSelector(selectTotalItems);

  return (
    <Link to="/cart" className={styles.cartIconLink}>
      <div className={styles.cartIconWrapper}>
        <img
          src={`${import.meta.env.BASE_URL}img/icons/Shopping_bag_(Cart).svg`}
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