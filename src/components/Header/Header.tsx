import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useMenu } from '../../hooks/useMenu';
import { Icon } from '../Icon';
import styles from './Header.module.scss';
import { ThemeToggle } from '../ThemeToggle';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { cart, favorites } = useCart();
  const { isMenuOpen, toggleMenu } = useMenu();

  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, { [styles['nav__link--active']]: isActive });

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to="/">
          <Icon name="logo" />
        </NavLink>
      </div>

      <nav className={styles.header__nav}>
        <ul className={styles.nav__list}>
          <li>
            <NavLink to="/" className={getActiveLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={getActiveLink}>
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={getActiveLink}>
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={getActiveLink}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.header__icons}>
        <div className={styles.header__icon}>
          <div className={styles.header__toggle}>
            <ThemeToggle />
          </div>
        </div>

        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavLink to="/favorites" className={styles.actions__link}>
            <Icon name="favourite" />
            {favorites.length > 0 && (
              <span className={styles.actions__count}>{favorites.length}</span>
            )}
          </NavLink>
        </div>
        <div
          className={`${styles.header__icon} ${styles['header__icon--link']}`}
        >
          <NavLink to="/cart" className={styles.actions__link}>
            <Icon name="cart" />
            {cart.length > 0 && (
              <span className={styles.actions__count}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          className={`${styles.header__icon} ${styles['header__icon--btn']}`}
          onClick={toggleMenu}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
};
