import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import { MenuLink } from '../../types/menuLink';
import classNames from 'classnames';
import { useFavorites } from '../../modules/Favorites/context/FavoritesContext';
import { useCart } from '../../modules/Cart/CartContext';
import { useState } from 'react';

const menuLinks: MenuLink[] = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { cartItems } = useCart();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsOpenMenu(prev => !prev);

  return (
    <header className={styles.menu}>
      <div className={styles.menu__left}>
        <Link to="/" className={styles.menu__logoImg}>
          <img
            src="./img/logo/logo.png"
            alt="Nice gadgets logo"
            className={styles.logo__image}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {menuLinks.map(link => (
              <li key={link.to} className={styles.nav__item}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(styles.nav__link, {
                      [styles.isActive]: isActive,
                    })
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        className={styles.menu__burger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <img src="./img/icons/burger-menu.png" alt="Menu" />
      </button>

      <div className={styles.menu__icons}>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.menu__iconsLike, {
              [styles.isActive]: isActive,
            })
          }
          onClick={() => setIsOpenMenu(false)}
        >
          <img
            src="./img/icons/like.png"
            alt="Like icon"
            className={styles.nav__icons}
          />
          {favorites.length > 0 && (
            <span className={styles.menu__badge}>{favorites.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.menu__iconsCart, {
              [styles.isActive]: isActive,
            })
          }
          onClick={() => setIsOpenMenu(false)}
        >
          <img
            src="./img/icons/cart.png"
            alt="Cart icon"
            className={styles.nav__icons}
          />
          {totalQuantity > 0 && (
            <span className={styles.menu__countCart}>{totalQuantity}</span>
          )}
        </NavLink>
      </div>

      <div
        className={classNames(styles.menu__dropdown, {
          [styles.isOpen]: isOpenMenu,
        })}
      >
        <div className={styles.menu__dropdownHeader}>
          <Link
            to="/"
            className={styles.menu__logoImg}
            onClick={() => setIsOpenMenu(false)}
          >
            <img
              src="./img/logo/logo.png"
              alt="Logo"
              className={styles.logo__image}
            />
          </Link>
          <button
            className={styles.menu__close}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <img src="./img/icons/close.png" alt="Close menu" />
          </button>
        </div>

        <ul className={styles.menu__list}>
          {menuLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  classNames(styles.nav__link, {
                    [styles.isActive]: isActive,
                  })
                }
                onClick={() => setIsOpenMenu(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.menu__bottomIcons}>
          <NavLink to="/favorites" className={styles.menu__bottomIcon}>
            <img src="./img/icons/like.png" alt="Favorites" />
            {favorites.length > 0 && (
              <span className={styles.menu__badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.menu__bottomIcon}>
            <img src="./img/icons/cart.png" alt="Cart" />
            {totalQuantity > 0 && (
              <span className={styles.menu__countCart}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
