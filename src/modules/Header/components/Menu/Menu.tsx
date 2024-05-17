import classNames from 'classnames';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../../utils/AppContext';
import heartIcon from '../../icons/heart.svg';
import whiteHeart from '../../icons/whiteHeart.svg';
import cartIcon from '../../icons/cart-icon.svg';
import whiteCart from '../../icons/whiteCart.svg';

type Props = {
  isMenuActive: boolean;
  setIsMenuActive: (v: boolean) => void;
};

export const Menu: React.FC<Props> = ({ isMenuActive, setIsMenuActive }) => {
  const { favorites, inCartItems, isDarkTheme } = useContext(AppContext);

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    classNames(
      styles.navList__link,
      isActive ? styles.activeNavLink : '',
      isDarkTheme ? styles.navList__linkDark : '',
      isDarkTheme && isActive ? styles.activeNavLinkDark : '',
    );

  const getActiveClassButton = ({ isActive }: { isActive: boolean }) => {
    if (isActive && isDarkTheme) {
      return classNames(
        styles.activeNavLinkButton,
        styles.activeNavLinkButtonDark,
      );
    }

    if (isActive) {
      return classNames(styles.activeNavLinkButton);
    }

    return;
  };

  return (
    <div
      className={classNames(
        styles.menu,
        isMenuActive ? '' : styles.inactive,
        isDarkTheme ? styles.menuDark : '',
      )}
    >
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li
            className={styles.navList__item}
            onClick={() => setIsMenuActive(false)}
          >
            <NavLink className={getActiveClass} to="/">
              Home
            </NavLink>
          </li>
          <li
            className={styles.navList__item}
            onClick={() => setIsMenuActive(false)}
          >
            <NavLink className={getActiveClass} to="/phones">
              Phones
            </NavLink>
          </li>
          <li
            className={styles.navList__item}
            onClick={() => setIsMenuActive(false)}
          >
            <NavLink className={getActiveClass} to="/tablets">
              Tablets
            </NavLink>
          </li>
          <li
            className={styles.navList__item}
            onClick={() => setIsMenuActive(false)}
          >
            <NavLink className={getActiveClass} to="/accessories">
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu__icons}>
        <NavLink
          to={'/favorites'}
          className={isActive =>
            classNames(styles.menu__icon, getActiveClassButton(isActive))
          }
          style={
            isDarkTheme
              ? { backgroundImage: `url(${whiteHeart})` }
              : { backgroundImage: `url(${heartIcon})` }
          }
          onClick={() => setIsMenuActive(false)}
        >
          {!!favorites.length && (
            <div className={styles.counter}>{favorites.length}</div>
          )}
        </NavLink>

        <NavLink
          to={'/cart'}
          className={isActive =>
            classNames(styles.menu__icon, getActiveClassButton(isActive))
          }
          style={
            isDarkTheme
              ? { backgroundImage: `url(${whiteCart})` }
              : { backgroundImage: `url(${cartIcon})` }
          }
          onClick={() => setIsMenuActive(false)}
        >
          {!!inCartItems.length && (
            <div className={styles.counter}>{inCartItems.length}</div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
