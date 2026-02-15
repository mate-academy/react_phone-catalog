import { Link, NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import classNames from 'classnames';
import styles from './Header.module.scss';

import logo from '/img/logo.png';
import menu from '/img/menu.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { menuModeSlice } from '../../features/menuMode';
import { useMemo } from 'react';

export const Header = () => {
  const cart = useAppSelector(state => state.cartProducts);
  const favourites = useAppSelector(state => state.favourites);
  const dispatch = useAppDispatch();

  const totalNumberOfItems = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  const handleMenuOpen = () => {
    dispatch(menuModeSlice.actions.setIsOpen());
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.button, {
      [styles.is_active]: isActive,
    });

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>

      <Navbar />

      <div className={styles.buttons}>
        <NavLink to="/favourites" className={getLinkClass}>
          <div className={styles.icon_fav}>
            {favourites.items.length > 0 && (
              <div className={styles.items_quantity}>
                {favourites.items.length}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getLinkClass}>
          <div className={styles.icon_cart}>
            {cart.items.length > 0 && (
              <div className={styles.items_quantity}>{totalNumberOfItems}</div>
            )}
          </div>
        </NavLink>

        <div className={styles.button_menu} onClick={handleMenuOpen}>
          <img src={menu} className={styles.icon} alt="menu icon" />
        </div>
      </div>
    </header>
  );
};
