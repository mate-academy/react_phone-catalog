import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../context/StoreContext';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, favorites } = useStore();
  const location = useLocation();

  // Закриваємо меню при переході на іншу сторінку
  useEffect(() => {
    document.body.style.overflow = '';
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;

      document.body.style.overflow = newState ? 'hidden' : '';

      return newState;
    });
  };

  const closeMenu = () => {
    document.body.style.overflow = '';
    setIsMenuOpen(false);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, {
      [styles['nav__link--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      {/* Використовуємо Bulma container для обмеження ширини та центрування */}
      <div className={classNames(styles.header__container)}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            {/* Використовуємо SVG логотип проєкту */}
            <img
              src="/img/Logo.png"
              alt="Nice Gadgets"
              className={styles.logo__img}
            />
          </Link>

          {/* Десктопна навігація */}
          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.actions}>
          <Link
            to="/favorites"
            className={classNames(styles.actionBtn, styles.actionBtn__desktop)}
          >
            <i className="fa-regular fa-heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={classNames(styles.actionBtn, styles.actionBtn__desktop)}
          >
            <i className="fa-solid fa-bag-shopping" />
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Link>

          {/* Кнопка Гамбургер / Закрити */}
          <button className={styles.burger} onClick={toggleMenu}>
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark" />
            ) : (
              <i className="fa-solid fa-bars" />
            )}
          </button>
        </div>
      </div>

      {/* Мобільне меню (виїжджає збоку/з'являється під хедером) */}
      <aside
        className={classNames(styles.menu, {
          [styles['menu--open']]: isMenuOpen,
        })}
      >
        <nav className={styles.menu__nav}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>

        {/* Іконки внизу мобільного меню */}
        <div className={styles.menu__footer}>
          <Link
            to="/favorites"
            className={styles.actionBtn}
            onClick={closeMenu}
          >
            <i className="fa-regular fa-heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.actionBtn} onClick={closeMenu}>
            <i className="fa-solid fa-bag-shopping" />
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </Link>
        </div>
      </aside>
    </header>
  );
};
