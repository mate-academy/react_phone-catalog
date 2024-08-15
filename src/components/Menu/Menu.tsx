import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsMenuActive,
  setIsMenuActive,
} from '../../redux/slices/isMenuActiveSlice';
import { AddActiveClass } from '../../types/AddActiveClass';
import { BarIcons } from '../BarIcons';
import styles from './Menu.module.scss';

const addNavLinkClass: AddActiveClass = ({ isActive }) =>
  classNames(styles.navLink, {
    [styles.navLinkActive]: isActive,
  });

export const Menu = () => {
  const isMenuActive = useAppSelector(selectIsMenuActive);
  const dispatch = useAppDispatch();

  const closeMenu = useCallback(
    () => dispatch(setIsMenuActive(false)),
    [dispatch],
  );

  return (
    <div className={classNames(styles.menu, { 'menu-active': isMenuActive })}>
      <div>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <button
              type="button"
              className={styles.logoBtn}
              onClick={closeMenu}
            >
              <img
                className={styles.logoImg}
                src="img/icons/logo.svg"
                alt="Logo"
              />
            </button>
          </div>

          <div className={styles.closeIcon}>
            <div className={styles.topVerticalLine} />
            <button
              type="button"
              className={classNames(styles.btnClose)}
              onClick={closeMenu}
            />
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" className={addNavLinkClass} onClick={closeMenu}>
                home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={addNavLinkClass}
                onClick={closeMenu}
              >
                phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={addNavLinkClass}
                onClick={closeMenu}
              >
                tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={addNavLinkClass}
                onClick={closeMenu}
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottomBarIcons}>
        <BarIcons />
      </div>
    </div>
  );
};
