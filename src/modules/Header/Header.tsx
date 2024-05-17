import styles from './Header.module.scss';
import burgerMenuIcon from './icons/burger-menu-icon.svg';
import whiteMenu from './icons/whiteMenu.svg';
import cartIcon from './icons/cart-icon.svg';
import whiteCart from './icons/whiteCart.svg';
import heartIcon from './icons/heart.svg';
import whiteHeart from './icons/whiteHeart.svg';
import closeIcon from './icons/close.svg';
import whiteClose from './icons/whiteClose.svg';
import classNames from 'classnames';
import { Logo } from '../../shared/components/Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../utils/AppContext';
import { Menu } from './components/Menu/Menu';

export const Header = () => {
  const { favorites, inCartItems, isDarkTheme, setIsDarkTheme } =
    useContext(AppContext);
  const [isMenuActive, setIsMenuActive] = useState(false);

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
    <>
      <header
        className={classNames(
          styles.header,
          isDarkTheme ? styles.header__dark : '',
        )}
      >
        <Logo />

        <nav className={styles.header__nav}>
          <ul className={styles.navList}>
            <li className={styles.navList__item}>
              <NavLink className={getActiveClass} to="/">
                Home
              </NavLink>
            </li>
            <li className={styles.navList__item}>
              <NavLink className={getActiveClass} to="/phones">
                Phones
              </NavLink>
            </li>
            <li className={styles.navList__item}>
              <NavLink className={getActiveClass} to="/tablets">
                Tablets
              </NavLink>
            </li>
            <li className={styles.navList__item}>
              <NavLink className={getActiveClass} to="/accessories">
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__icons}>
          <div
            className={classNames(
              styles.themeSwitcher,
              isDarkTheme ? styles.themeSwitcherDark : '',
            )}
          >
            <div
              className={classNames(
                styles.themeSwitcher__button,
                isDarkTheme ? styles.darkSwitcherButton : '',
              )}
              onClick={() => setIsDarkTheme(!isDarkTheme)}
            >
              <div
                className={classNames(
                  styles.themeSwitcher__indicator,
                  isDarkTheme ? styles.darkIndicator : '',
                )}
              ></div>
            </div>
          </div>

          <div
            className={classNames(
              styles.menuIcon,
              styles.header__icon,
              isDarkTheme ? styles.header__iconDark : '',
            )}
            style={
              isMenuActive
                ? isDarkTheme
                  ? { backgroundImage: `url(${whiteClose})` }
                  : { backgroundImage: `url(${closeIcon})` }
                : isDarkTheme
                  ? { backgroundImage: `url(${whiteMenu})` }
                  : { backgroundImage: `url(${burgerMenuIcon})` }
            }
            onClick={() => setIsMenuActive(!isMenuActive)}
          ></div>

          <NavLink
            to={'/favorites'}
            className={isActive =>
              classNames(
                styles.notMenuIcon,
                styles.header__icon,
                getActiveClassButton(isActive),
                isDarkTheme ? styles.notMenuIconDark : '',
                isDarkTheme ? styles.header__iconDark : '',
              )
            }
            style={
              isDarkTheme
                ? { backgroundImage: `url(${whiteHeart})` }
                : { backgroundImage: `url(${heartIcon})` }
            }
          >
            {!!favorites.length && (
              <div className={styles.counter}>{favorites.length}</div>
            )}
          </NavLink>

          <NavLink
            to={'/cart'}
            className={isActive =>
              classNames(
                styles.notMenuIcon,
                styles.header__icon,
                getActiveClassButton(isActive),
                isDarkTheme ? styles.notMenuIconDark : '',
                isDarkTheme ? styles.header__iconDark : '',
              )
            }
            style={
              isDarkTheme
                ? { backgroundImage: `url(${whiteCart})` }
                : { backgroundImage: `url(${cartIcon})` }
            }
          >
            {!!inCartItems.length && (
              <div className={styles.counter}>{inCartItems.length}</div>
            )}
          </NavLink>
        </div>
      </header>

      <Menu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
    </>
  );
};
