import { Navbar } from '../Navbar';
import classNames from 'classnames';
import styles from './Menu.module.scss';

import logo from '/img/logo.png';
import close from '/img/close.svg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MenuMode } from '../../types/MenuMode';
import { menuModeSlice } from '../../features/menuMode';

export const Menu = () => {
  const favourites = useAppSelector(state => state.favourites);
  const cart = useAppSelector(state => state.cartProducts);
  const menuMode = useAppSelector(state => state.menuMode);

  const dispatch = useAppDispatch();

  const handleMenuClose = () => {
    dispatch(menuModeSlice.actions.setIsClose());
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.button_footer, {
      [styles.is_active]: isActive,
    });

  return (
    <aside
      className={classNames([styles.menu], {
        open: menuMode === MenuMode.OPEN,
      })}
    >
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.button}>
          <img
            src={close}
            className={styles.icon}
            alt="close icon"
            onClick={handleMenuClose}
          />
        </div>
      </div>

      <Navbar isInMenu />

      <div className={styles.footer}>
        <NavLink
          to="/favourites"
          className={getLinkClass}
          onClick={handleMenuClose}
          style={{ border: 0 }}
        >
          <div className={styles.icon_fav}>
            {favourites.items.length > 0 && (
              <div className={styles.items_quantity}>
                {favourites.items.length}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getLinkClass} onClick={handleMenuClose}>
          <div className={styles.icon_cart}>
            {cart.items.length > 0 && (
              <div className={styles.items_quantity}>{cart.items.length}</div>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
