import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import { MenuLink } from '../../types/menuLink';
import classNames from 'classnames';
import { useFavorites } from '../../modules/Favorites/context/FavoritesContext';

const menuLinks: MenuLink[] = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <header className={styles.menu}>
      <div className={styles.container}>
        <div className={styles.menu__left}>
          <Link to="/" className={styles.menu__logoImg}>
            <img
              src="/img/logo/logo.png"
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

        <div className={styles.menu__icons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.menu__iconsLike, {
                [styles.isActive]: isActive,
              })
            }
          >
            <img
              src="/img/icons/like.png"
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
          >
            <img
              src="/img/icons/cart.png"
              alt="Cart icon"
              className={styles.nav__icons}
            />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
