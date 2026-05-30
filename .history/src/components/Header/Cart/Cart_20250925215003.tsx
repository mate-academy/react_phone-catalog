/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Cart.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import classNames from 'classnames';

export const Cart = () => {
  const { cartItems } = useContext(StoreContext);
  const { cartItems } = useContext(Th);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.cart, { [styles.active]: isActive });

  return (
    <NavLink to="/cart" className={getLinkClass}>
      {cartItems.length > 0 && (
        <div className={styles.counter}>{cartItems.length}</div>
      )}
      <img
        src="images/Shopping bag (Cart).svg"
        alt="Cart Logo"
        className={styles.icon}
      />
    </NavLink>
  );
};
