import React from 'react';
import styles from './HeaderNav.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
// eslint-disable-next-line max-len
import { useCartAndFavContext } from '../../modules/shared/context/CartAndFavContext';
import { useThemeContext } from '../../modules/shared/context/ThemeContext';

export const HeaderNav = () => {
  const { cart, favorites } = useCartAndFavContext();
  const { toggleTheme } = useThemeContext();

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, { [styles['link--active']]: isActive });

  const getActiveTab = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.icon, { [styles['icon--active']]: isActive });

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__container}>
          <ul className={styles.nav__list}>
            <li>
              <NavLink to="/" className={getActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getActiveLink}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getActiveLink}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getActiveLink}>
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className={styles.icons}>
            <div className={styles.icon} onClick={() => toggleTheme()}>
              <div className={styles.theme} />
            </div>
            <NavLink to="/favourites" className={getActiveTab}>
              <Icon name="favourites" />
              {totalFavorites > 0 && (
                <div className={styles.total}>
                  {totalFavorites > 99 ? '...' : totalFavorites}
                </div>
              )}
              <div className={styles.line} />
            </NavLink>
            <NavLink to="/cart" className={getActiveTab}>
              <Icon name="cart" />
              {totalQuantity > 0 && (
                <div className={styles.total}>
                  {totalQuantity > 99 ? '...' : totalQuantity}
                </div>
              )}
              <div className={styles.line} />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
