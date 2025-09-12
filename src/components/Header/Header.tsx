import { Link, NavLink } from 'react-router-dom';
import styles from '../Header/Header.module.scss';
import { MenuLink } from '../../types/menuLink';
import classNames from 'classnames';

const menuLinks: MenuLink[] = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header: React.FC = () => {
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
          <a href="#" className={styles.menu__iconsLike}>
            <img
              src="/img/icons/like.png"
              alt="Like icon"
              className={styles.nav__icons}
            />
          </a>
          <a href="#">
            <img
              src="/img/icons/cart.png"
              alt="Cart icon"
              className={styles.nav__icons}
            />
          </a>
        </div>
      </div>
    </header>
  );
};
