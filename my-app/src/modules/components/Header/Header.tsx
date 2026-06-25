import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { BurgerMenu } from '../BurgerMenu';
import './Header.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const favCount = useAppSelector((state) => state.favourites.items.length);

  return (
    <>
      <header className="header">
        <div className="header__inner">
        <NavLink to="/" className="header__logo-link" aria-label="Home">
          <img
            className="header__logo"
            src="/img/logo-2.png"
            alt="Nice Gadgets"
          />
        </NavLink>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `header__icon-btn${isActive ? ' header__icon-btn--active' : ''}`
            }
            aria-label="Favourites"
          >
            <img src="/icons/icon--favourites.svg" alt="" aria-hidden="true" />
            {favCount > 0 && (
              <span className="header__badge">{favCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `header__icon-btn${isActive ? ' header__icon-btn--active' : ''}`
            }
            aria-label="Cart"
          >
            <img src="/icons/icon--empty-cart.svg" alt="" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="header__badge">{cartCount}</span>
            )}
          </NavLink>

          <button
            className={`header__burger${menuOpen ? ' header__burger--active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <img
              src={menuOpen ? '/icons/icon--close.svg' : '/icons/icon--burger-menu.svg'}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
        </div>
      </header>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
