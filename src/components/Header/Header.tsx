import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const navLinks = [
  { id: 1, title: 'Home', to: '/' },
  { id: 2, title: 'Phones', to: '/phones' },
  { id: 3, title: 'Tablets', to: '/tablets' },
  { id: 4, title: 'Accessories', to: '/accessories' },
];

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['logo-and-nav']}>
        <NavLink className={styles.header__logo} to="/">
          <img src="/img/Logo.svg" alt="Nice_Gadgets_logo" />
        </NavLink>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {navLinks.map(link => (
              <li key={link.id}>
                <NavLink to={link.to} className={styles['nav__list-link']}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles['icon-links']}>
        <NavLink className={styles['icon-link']} to="/favourites">
          <img
            src="/img/icons/Favourite_default.png"
            alt="favourites"
            className={styles.icon}
          />
        </NavLink>
        <NavLink className={styles['icon-link']} to="/cart">
          <img
            src="/img/icons/Cart_default.png"
            alt="cart"
            className={styles.icon}
          />
        </NavLink>
        <button className={styles['icon-link']}>
          <img
            src="/img/icons/burger-menu.svg"
            alt="burger-menu"
            className={styles.icon}
          />
        </button>
      </div>
    </header>
  );
};
