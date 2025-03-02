import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { CartContext } from '../../../../context/CartContext';

export const Header = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/icons/logo-icon.svg`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favouritesCount } = useContext(FavouritesContext);
  const { cartTotalItemsCount } = useContext(CartContext);

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return `${styles.nav__link} ${isActive ? styles['nav__link--active'] : ''}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header--mobile']}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/">
              <img src={logoUrl} alt="logo" />
            </Link>

            <button onClick={toggleMenu} className={styles.toggleButton} aria-label="Toggle menu">
              <span className={`${styles.icon} ${styles['icon--menu']}`}></span>
            </button>
          </div>
        </div>

        <aside className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          <div className={styles.top}>
            <Link className={styles.logoLink} to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logoUrl} alt="logo" />
            </Link>

            <button onClick={toggleMenu} className={styles.toggleButton} aria-label="Toggle menu">
              <span className={`${styles.icon} ${styles['icon--close']}`}></span>
            </button>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item} onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/" className={getLinkClassName}>
                  Home
                </NavLink>
              </li>
              <li className={styles.nav__item} onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/phones" className={getLinkClassName}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.nav__item} onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/tablets" className={getLinkClassName}>
                  Tablets
                </NavLink>
              </li>
              <li className={styles.nav__item} onClick={() => setIsMenuOpen(false)}>
                <NavLink to="/accessories" className={getLinkClassName}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.menu__icons}>
            <NavLink
              to="/favourites"
              onClick={() => setIsMenuOpen(false)}
              className={getLinkClassName}
            >
              <span className={`${styles.icon} ${styles['icon--heart']}`}>
                {favouritesCount > 0 && (
                  <span className={styles.itemsAmount}>{favouritesCount}</span>
                )}
              </span>
            </NavLink>

            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className={getLinkClassName}>
              <span className={`${styles.icon} ${styles['icon--cart']}`}>
                {cartTotalItemsCount > 0 && (
                  <span className={styles.itemsAmount}>{cartTotalItemsCount}</span>
                )}
              </span>
            </NavLink>
          </div>
        </aside>
      </header>
    </>
  );
};
