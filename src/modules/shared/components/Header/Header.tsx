import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { CartContext } from '../../../../context/CartContext';

export const Header = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const logoUrl = `${baseUrl}img/icons/logo-icon.svg`;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favouritesCount } = useContext(FavouritesContext);
  const { cartTotalItemsCount } = useContext(CartContext);

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return `${styles.nav__link} ${isActive ? styles['nav__link--active'] : ''}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles['header--mobile']}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/">
            <img src={logoUrl} alt="logo" />
          </Link>

          <button
            onClick={toggleMenu}
            className={styles.toggleButton}
            aria-label="Toggle menu"
          >
            <span className={`${styles.icon} ${styles['icon--menu']}`} />
          </button>
        </div>
      </div>

      <aside className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
        <div className={styles.top}>
          <Link className={styles.logoLink} to="/" onClick={() => setIsMenuOpen(false)}>
            <img src={logoUrl} alt="logo" />
          </Link>

          <button
            onClick={toggleMenu}
            className={styles.toggleButton}
            aria-label="Toggle menu"
          >
            <span className={`${styles.icon} ${styles['icon--close']}`} />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            {['/', '/phones', '/tablets', '/accessories'].map((path, i) => {
              const labels = ['Home', 'Phones', 'Tablets', 'Accessories'];

              return (
                <li key={path} className={styles.nav__item} onClick={() => setIsMenuOpen(false)}>
                  <NavLink to={path} className={getLinkClassName}>
                    {labels[i]}
                  </NavLink>
                </li>
              );
            })}
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

          <NavLink
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className={getLinkClassName}
          >
            <span className={`${styles.icon} ${styles['icon--cart']}`}>
              {cartTotalItemsCount > 0 && (
                <span className={styles.itemsAmount}>{cartTotalItemsCount}</span>
              )}
            </span>
          </NavLink>
        </div>
      </aside>
    </header>
  );
};
