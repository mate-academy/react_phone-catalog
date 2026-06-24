import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useAppContext } from '../../hooks/use-context';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, wishlistIds } = useAppContext();

  const isLiked = wishlistIds;
  const isInCart = cartItems;

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <img src="img/logo.svg" alt="Nice Gadget" />
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(styles.navLink, {
                      [styles.navLinkActive]: isActive,
                    })
                  }
                >
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              cn(styles.iconBtn, {
                [styles.iconBtnActive]: isActive,
              })
            }
          >
            <span className={styles.iconWrap}>
              <i className="far fa-heart" />
              {isLiked.length > 0 ? (
                <span className={styles.badge}>{isLiked.length}</span>
              ) : (
                ''
              )}
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.iconBtn, { [styles.iconBtnActive]: isActive })
            }
          >
            <span className={styles.iconWrap}>
              <i className="fas fa-bag-shopping" />
              {isInCart.length > 0 ? (
                <span className={styles.badge}>
                  {isInCart.reduce((acc, cur) => {
                    return acc + cur.qty;
                  }, 0)}
                </span>
              ) : (
                ''
              )}
            </span>
          </NavLink>

          <button
            type="button"
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <i className={cn('fas', isMenuOpen ? 'fa-xmark' : 'fa-bars')} />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {NAV_LINKS.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(styles.mobileNavLink, {
                        [styles.mobileNavLinkActive]: isActive,
                      })
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                cn(styles.mobileIconBtn, {
                  [styles.mobileIconBtnActive]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="far fa-heart" />
              {isLiked.length > 0 ? (
                <span className={styles.mobileBadge}>{isLiked.length}</span>
              ) : (
                ''
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles.mobileIconBtn, {
                  [styles.mobileIconBtnActive]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-bag-shopping" />
              {isInCart.length > 0 ? (
                <span className={styles.mobileBadge}>
                  {isInCart.reduce((acc, cur) => {
                    return acc + cur.qty;
                  }, 0)}
                </span>
              ) : (
                ''
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
