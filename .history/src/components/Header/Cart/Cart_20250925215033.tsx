/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Cart.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import classNames from 'classnames';
import { ThemeContext } from '../../../ThemeProvider';

export const Cart = () => {
  const { cartItems } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.cart, { [styles.active]: isActive });

  return (
    <NavLink to="/cart" className={getLinkClass}>
      {cartItems.length > 0 && (
        <div className={styles.counter}>{cartItems.length}</div>
      )}
      {theme === 'dark' ? :  }
      <img
        src=
        alt="Cart Logo"
        className={styles.icon}
      />
    </NavLink>
  );
};
