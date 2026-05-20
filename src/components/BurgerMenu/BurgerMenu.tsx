import './BurgerMenu.module.scss';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
// eslint-disable-next-line max-len
import { CartAndFavContext } from '../../modules/shared/context/CartAndFavContext';
import { useThemeContext } from '../../modules/shared/context/ThemeContext';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.link, {
    [styles['link--active']]: isActive,
  });
};

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.icon, {
    [styles['icon--active']]: isActive,
  });
};

export const BurgerMenu: React.FC<Props> = ({ isBurgerMenu, onClose }) => {
  const context = useContext(CartAndFavContext);
  const { cart, favorites } = context;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;
  const { toggleTheme } = useThemeContext();

  useEffect(() => {
    if (isBurgerMenu) {
      document.documentElement.style.height = '100vh';
      document.body.style.height = '100vh';

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.height = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isBurgerMenu]);

  return (
    isBurgerMenu && (
      <nav className={styles.menu}>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li>
              <NavLink
                to="/"
                className={getActiveLink}
                onClick={() => onClose()}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={getActiveLink}
                onClick={() => onClose()}
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={getActiveLink}
                onClick={() => onClose()}
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={getActiveLink}
                onClick={() => onClose()}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className={styles.icons}>
            <div className={styles.icon} onClick={() => toggleTheme()}>
              <div className={styles.theme} />
            </div>
            <NavLink
              to="/favourites"
              className={getActiveTab}
              onClick={() => onClose()}
            >
              <Icon name="favourites" />
              {totalFavorites > 0 && (
                <div className={styles.total}>
                  {totalFavorites > 99 ? '...' : totalFavorites}
                </div>
              )}
              <div className={styles.line} />
            </NavLink>
            <NavLink
              to="/cart"
              className={getActiveTab}
              onClick={() => onClose()}
            >
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
    )
  );
};
