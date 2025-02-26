import styles from './Header.module.scss';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../Store/Store';
import { Navbar } from '../../enums/Navbar';

const getNavbarLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__navbarItem, {
    [styles['is-active']]: isActive,
  });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__iconLink, {
    [styles['is-active']]: isActive,
  });

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuVisible } = useContext(StateContext);
  const { favourites } = useContext(StateContext);
  const { cart } = useContext(StateContext);
  const [wasMenuOpen, setWasMenuOpen] = useState(isMenuVisible);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        if (isMenuVisible) {
          setWasMenuOpen(true);
          dispatch({ type: 'closeMenu' });
        }
      } else {
        if (wasMenuOpen) {
          dispatch({ type: 'openMenu' });
          setWasMenuOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, isMenuVisible, wasMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link to={'/'} className={styles.header__logoLink}>
          <img
            src="/img/header-logo.png"
            alt="Logo"
            className={styles.header__logo}
          />
        </Link>
        <div className={styles.header__navbar}>
          {Object.values(Navbar).map(page => (
            <NavLink
              to={page === Navbar.home ? '/' : page}
              className={getNavbarLinkClass}
              key={page}
            >
              {page}
            </NavLink>
          ))}
        </div>
      </div>

      <div className={styles.header__iconsContainer}>
        <NavLink to={'/favourites'} className={getIconLinkClass}>
          <div className={styles.header__icon}>
            {favourites.length > 0 && (
              <div className={styles.header__iconAmount}>
                <span className={styles.header__iconAmountText}>
                  {favourites.length}
                </span>
              </div>
            )}
            <img
              src="/img/icons/favourites-icon.svg"
              alt="Favourites"
              className={styles.header__iconImage}
            />
          </div>
        </NavLink>
        <NavLink to={'/cart'} className={getIconLinkClass}>
          <div className={styles.header__icon}>
            {cart.length > 0 && (
              <div className={styles.header__iconAmount}>
                <span className={styles.header__iconAmountText}>
                  {cart.length}
                </span>
              </div>
            )}
            <img
              src="/img/icons/cart-icon.svg"
              alt="Cart"
              className={styles.header__iconImage}
            />
          </div>
        </NavLink>
        <button
          className={styles.header__menuButton}
          onClick={() =>
            isMenuVisible
              ? dispatch({ type: 'closeMenu' })
              : dispatch({ type: 'openMenu' })
          }
        >
          {isMenuVisible ? (
            <img
              src="/img/icons/close-icon.svg"
              className={styles.header__closeIcon}
            />
          ) : (
            <img
              src="/img/icons/menu-icon.svg"
              className={styles.header__menuIcon}
            />
          )}
        </button>
      </div>
    </header>
  );
};
