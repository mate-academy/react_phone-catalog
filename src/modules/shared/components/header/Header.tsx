import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.navigation__link, {
    [styles['navigation__link--active']]: isActive,
  });
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.add('no-scroll');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__top}>
          <Link to="/">
            <img
              src={'./logo/Logo.svg'}
              alt="Logo"
              className={styles.header__logo}
            />
          </Link>
          <div className={styles.header__burger}>
            {isMenuOpen ? (
              <img
                src="./logo/Close.svg"
                alt="Close menu"
                onClick={closeMenu}
              />
            ) : (
              <img src="./logo/Menu.svg" alt="Open menu" onClick={handleMenu} />
            )}
          </div>
        </div>
        <nav
          className={classNames(styles.navigation, {
            [styles['navigation--hamburger']]: isMenuOpen,
          })}
        >
          <ul className={styles.navigation__list}>
            {['Home', 'Phones', 'Tablets', 'Accessories'].map(element => (
              <li key={element} className={styles.navigation__item}>
                <NavLink
                  to={element === 'Home' ? '/' : element.toLowerCase()}
                  className={getLinkClasses}
                  onClick={closeMenu}
                >
                  {element}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.navigation__icons}>
            <div className={styles.navigation__icon}>
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `${getLinkClasses({ isActive })} badgeItems`
                }
                onClick={closeMenu}
              >
                <img src={'./icons/favourites-heart.svg'} alt="Heart" />
              </NavLink>
            </div>
            <div className={styles.navigation__icon}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${getLinkClasses({ isActive })} badgeItems`
                }
                onClick={closeMenu}
              >
                <img src={'./logo/Cart.svg'} alt="Cart" />
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
