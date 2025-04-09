import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import styles from './Header.module.scss';
//import { useAppSelector } from '../../Hooks/hooks';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const { favorites, cart } = useAppSelector(state => state.products);
  const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
    return cn(styles.navigation__link, {
      [styles['navigation__link--active']]: isActive,
    });
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__menu}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={'../../../public/img/logo/Logo.svg'}
              alt="Logo"
              className={styles.header__logo}
            />
          </Link>
          <div className={styles.header__burger}>
            {isMenuOpen ? (
              <img
                src="../../../public/img/logo/Close.svg"
                alt="Close menu"
                onClick={handleMenu}
              />
            ) : (
              <img
                src="../../../public/img/logo/Menu.svg"
                alt="Open menu"
                onClick={handleMenu}
              />
            )}
          </div>
        </div>
        <nav
          className={cn(styles.navigation, {
            [styles['navigation--active']]: isMenuOpen,
          })}
        >
          <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <NavLink to="/" className={getLinkClasses} onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="phones"
                className={getLinkClasses}
                onClick={closeMenu}
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="tablets"
                className={getLinkClasses}
                onClick={closeMenu}
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink
                to="accessories"
                className={getLinkClasses}
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
                  `${getLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'../../../public/img/logo/Heart.svg'}
                  alt="Heart"
                  className={styles.navigation__icon}
                />
              </NavLink>
            </div>
            <div className={styles.navigation__icons__item}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${getLinkClasses({ isActive })} badge-items`
                }
                onClick={closeMenu}
              >
                <img
                  src={'../../../public/img/logo/Cart.svg'}
                  alt="Cart"
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
