import { Link, NavLink } from 'react-router-dom';
import { useState, useMemo } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hook';
import heart from '../../assets/img/icons/favourites.svg';
export const Header = () => {
  const favourites = useAppSelector(state => state.favourites.products);
  const cartProducts = useAppSelector(state => state.cart.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCount = useMemo(() => {
    return cartProducts.reduce((count, product) => count + product.count, 0);
  }, [cartProducts]);

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
                  `${generateLinkClasses({ isActive })} ${styles['badge-items']}`
                }
                onClick={closeMenu}
              >
                <img
                  src={heart}
                  alt="favourites-heart"
                  className={styles.navigation__icon}
                />
                {favourites.length > 0 && (
                  <span className={styles.badgeItemCount}>
                    {favourites.length}
                  </span>
                )}
              </NavLink>
            </div>
            <div className={styles.navigation__icons__item}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `${generateLinkClasses({ isActive })} ${styles['badge-items']}`
                }
                onClick={closeMenu}
              >
                <img
                  src={'./img/icons/shopping-bag.svg'}
                  alt="shopping-bag"
                  className={styles.navigation__icon}
                />
                {!!totalCount && (
                  <span className={styles.badgeItemCount}>{totalCount}</span>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
