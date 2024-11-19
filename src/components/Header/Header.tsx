import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const generateLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navigation__link, {
      [styles['navigation__link--active']]: isActive,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__menu}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={'./img/icons/logo.svg'}
              alt="logo"
              className={styles.header__logo}
            />
          </Link>
          <div className={styles.header__burger} onClick={handleMenu}>
            <img
              src={
                isMenuOpen
                  ? './img/icons/close.svg'
                  : './img/icons/burger-menu.svg'
              }
              alt={isMenuOpen ? 'close menu' : 'open menu'}
            />
          </div>
        </div>

        <nav
          className={classNames(styles.navigation, {
            [styles['navigation--active']]: isMenuOpen,
          })}
        >
          <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <NavLink
                to="/"
                className={({ isActive }) => generateLinkClasses({ isActive })}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="phones"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="tablets"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="accessories"
                className={generateLinkClasses}
                onClick={closeMenu}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className={styles.navigation__icons}>
            <div className={styles.navigation__icons__item}>
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `${generateLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/favourites.svg'}
                  alt="favourites-heart"
                  className={styles.navigation__icon}
                />
              </NavLink>
            </div>
            <div className={styles.navigation__icons__item}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${generateLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/shopping-bag.svg'}
                  alt="shopping-bag"
                  className={styles.navigation__icon}
                />
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
