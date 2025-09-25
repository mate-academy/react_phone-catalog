import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { getTotalQuantity } = useCart();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['header__nav-link'], {
      [styles['header__nav-link--active']]: isActive,
    });

  const getActionBtnClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['header__action-btn'], {
      [styles['header__action-btn--active']]: isActive,
    });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav
        data-cy="nav"
        className={styles.header__navbar}
        role="navigation"
        aria-label="main navigation"
      >
        <div
          className={classNames(styles.header__container, {
            [styles['header__container--menu-open']]: isMenuOpen,
          })}
        >
          {/* Логотип */}
          <div className={styles['header__logo-wrapper']}>
            <Link to="/">
              <img
                src="./img/logo.svg"
                alt="MA"
                className={styles.header__logo}
              />
            </Link>
          </div>

          {/* Мобільний бургер */}
          <button
            className={styles.header__burger}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={
                isMenuOpen ? './img/Icons/close.svg' : './img/Icons/menu.svg'
              }
              alt={isMenuOpen ? 'Close' : 'Menu'}
            />
          </button>

          {/* Десктопні лінки */}
          <div className={styles.header__links}>
            <NavLink to="/" end className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getNavLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </div>

          {/* Десктопні кнопки */}
          <div className={styles.header__actionsDesktop}>
            <NavLink
              to="/favorites"
              className={getActionBtnClass}
              aria-label="Favorites"
            >
              <span className={styles.header__iconWrapper}>
                <img src="./img/Icons/favorites.svg" alt="Favorites" />
                {favorites.length > 0 && (
                  <span className={styles.header__badge}>
                    {favorites.length}
                  </span>
                )}
              </span>
            </NavLink>

            <NavLink to="/cart" className={getActionBtnClass} aria-label="Cart">
              <span className={styles.header__iconWrapper}>
                <img src="./img/Icons/cart.svg" alt="Cart" />
                {getTotalQuantity() > 0 && (
                  <span className={styles.header__badge}>
                    {getTotalQuantity()}
                  </span>
                )}
              </span>
            </NavLink>
          </div>
        </div>

        {/* Мобільне меню */}
        {isMenuOpen && (
          <div className={styles.header__mobileMenu}>
            <div className={styles.header__mobileLinks}>
              <NavLink
                to="/"
                end
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </NavLink>
            </div>

            {/* Мобільні кнопки внизу */}
            <div className={styles.header__mobileBottom}>
              <div className={styles.header__actionsMobile}>
                <NavLink
                  to="/favorites"
                  className={getActionBtnClass}
                  aria-label="Favorites"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={styles.header__iconWrapper}>
                    <img src="./img/Icons/favorites.svg" alt="Favorites" />
                    {favorites.length > 0 && (
                      <span className={styles.header__badge}>
                        {favorites.length}
                      </span>
                    )}
                  </span>
                </NavLink>

                <NavLink
                  to="/cart"
                  className={getActionBtnClass}
                  aria-label="Cart"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={styles.header__iconWrapper}>
                    <img src="./img/Icons/cart.svg" alt="Cart" />
                    {getTotalQuantity() > 0 && (
                      <span className={styles.header__badge}>
                        {getTotalQuantity()}
                      </span>
                    )}
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
