import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, {
    [styles['nav__link--active']]: isActive,
  });

export const Header = () => {
  const logoUrl = `/img/icons/NiceGadgets.svg`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favouritesCount } = useFavourites();
  const { cartTotalItemsCount } = useCart();

  useLockBodyScroll(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header--mobile']}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="Logo" />
            </Link>

            <button onClick={toggleMenu} className={styles.toggleButton} aria-label="Toggle menu">
              <span className={classNames(styles.icon, styles['icon--menu'])} />
            </button>
          </div>
        </div>

        <aside className={classNames(styles.menu, { [styles.active]: isMenuOpen })}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="Logo" />
            </Link>

            <button onClick={toggleMenu} className={styles.toggleButton} aria-label="Toggle menu">
              <span className={classNames(styles.icon, styles['icon--close'])} />
            </button>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              {navItems.map(({ to, label }) => (
                <li key={to} className={styles.nav__item}>
                  <NavLink to={to} className={getLinkClassName}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.menu__icons}>
            <NavLink
              to="/favourites"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClassName}
            >
              <span className={classNames(styles.icon, styles['icon--heart'])}>
                {favouritesCount > 0 && (
                  <span className={styles.itemAmount}>{favouritesCount}</span>
                )}
              </span>
            </NavLink>

            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className={getLinkClassName}>
              <span className={classNames(styles.icon, styles['icon--cart'])}>
                {cartTotalItemsCount > 0 && (
                  <span className={styles.itemAmount}>{cartTotalItemsCount}</span>
                )}
              </span>
            </NavLink>
          </div>
        </aside>
      </header>
    </>
  );
};
