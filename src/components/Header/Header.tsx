import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <span>NICE</span>
          <span className={styles.fire}>🔥</span>
          <br />
          <span>GADGETS</span>
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
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              cn(styles.iconBtn, { [styles.iconBtnActive]: isActive })
            }
          >
            <span className={styles.iconWrap}>
              <i className="far fa-heart" />
              {/* TODO: <span className={styles.badge}>2</span> */}
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
              {/* TODO: <span className={styles.badge}>3</span> */}
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
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={styles.mobileIconBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="far fa-heart" />
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.mobileIconBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-bag-shopping" />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
