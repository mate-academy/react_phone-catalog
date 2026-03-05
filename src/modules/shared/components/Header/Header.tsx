import classNames from 'classnames';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { CartIcon, HeartIcon } from '../Icons';

const getLinkClass = ({ isActive }: { isActive: boolean }, baseClass: string) =>
  classNames(baseClass, { [styles.active]: isActive });

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <NavLink to="/" className={styles.logo} aria-label="Go to home page">
            <span className={styles.logoText}>Nice Gadgets</span>
          </NavLink>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={state => getLinkClass(state, styles.nav__link)}
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={state => getLinkClass(state, styles.nav__link)}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={state => getLinkClass(state, styles.nav__link)}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={state => getLinkClass(state, styles.nav__link)}
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={state => getLinkClass(state, styles.actions__link)}
          >
            <HeartIcon />
          </NavLink>

          <NavLink
            to="/cart"
            className={state => getLinkClass(state, styles.actions__link)}
          >
            <CartIcon />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
