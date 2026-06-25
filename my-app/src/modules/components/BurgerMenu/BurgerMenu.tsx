import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import './BurgerMenu.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export function BurgerMenu({ isOpen, onClose }: Props) {
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const favCount = useAppSelector((state) => state.favourites.items.length);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`burger-overlay${isOpen ? ' burger-overlay--active' : ''}`}
        onClick={onClose}
      />

      <aside className={`burger-menu${isOpen ? ' burger-menu--open' : ''}`}>
        <nav className="burger-menu__nav">
          <ul className="burger-menu__list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className="burger-menu__item">
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `burger-menu__link${isActive ? ' burger-menu__link--active' : ''}`
                  }
                  onClick={onClose}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="burger-menu__bottom">
          <NavLink
            to="/favourites"
            className="burger-menu__icon-btn"
            onClick={onClose}
            aria-label="Favourites"
          >
            <img src="/icons/icon--favourites.svg" alt="" aria-hidden="true" />
            {favCount > 0 && (
              <span className="burger-menu__badge">{favCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="burger-menu__icon-btn"
            onClick={onClose}
            aria-label="Cart"
          >
            <img src="/icons/icon--empty-cart.svg" alt="" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="burger-menu__badge">{cartCount}</span>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
}
