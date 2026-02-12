import { NavLink, useMatch, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import s from './Header.module.scss';

import Logo from '../../../assets/Logo.svg';
import Heart from '../../../assets/Favourites (Heart Like).svg';
import Cart from '../../../assets/Shopping bag (Cart).svg';
import BurgerMenu from '../../../assets/Burger Menu icon.svg';
import CloseBurgerMenu from '../../../assets/Burger Menu Close.svg';

export const Header = () => {
  const { count: favCount } = useFavorites();
  const { totalQty: cartQty } = useCart();

  const matchPhones = useMatch('/phones/*');
  const matchTablets = useMatch('/tablets/*');
  const matchAccessories = useMatch('/accessories/*');
  const matchFavorites = useMatch('/favorites/*');

  const showSearch =
    !!matchPhones || !!matchTablets || !!matchAccessories || !!matchFavorites;

  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('query') || '');

  useEffect(() => {
    const urlQuery = params.get('query') || '';

    setQuery(prev => (prev !== urlQuery ? urlQuery : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.toString()]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      const trimmed = query.trim();

      if (trimmed) {
        next.set('query', trimmed);
      } else {
        next.delete('query');
      }

      setParams(next);
    }, 400);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [open, setOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <NavLink to="/" className={s.logo} aria-label="Nice Gadgets">
            <img
              src={Logo}
              alt="logo"
              className={s.logoImg}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </NavLink>

          <nav className={s.nav} aria-label="Primary">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${s.link} ${isActive ? s.active : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${s.link} ${isActive ? s.active : ''}`
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${s.link} ${isActive ? s.active : ''}`
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${s.link} ${isActive ? s.active : ''}`
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        {showSearch && (
          <div className={s.search} role="search">
            <input
              type="search"
              placeholder="Search"
              value={query}
              onChange={onChange}
              className={s.searchInput}
              aria-label="Search"
            />
          </div>
        )}

        <div className={s.right}>
          <button
            className={s.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
          >
            <img
              src={open ? CloseBurgerMenu : BurgerMenu}
              alt="burger-menu-icon"
              aria-hidden="true"
              className={s.burgerIcon}
            />
          </button>

          <NavLink to="/favorites" className={s.iconBtn} aria-label="Favorites">
            <img
              src={Heart}
              alt="favorites-icon"
              aria-hidden="true"
              className={s.iconImg}
              width={24}
              height={24}
            />
            {favCount > 0 && <span className={s.badge}>{favCount}</span>}
          </NavLink>

          <NavLink to="/cart" className={s.iconBtn} aria-label="Cart">
            <img
              src={Cart}
              alt=""
              aria-hidden="true"
              className={s.iconImg}
              width={24}
              height={24}
            />
            {cartQty > 0 && <span className={s.badge}>{cartQty}</span>}
          </NavLink>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`${s.navPanel} ${open ? s.navPanelOpen : ''}`}
        aria-label="Mobile"
        onClick={e => {
          const t = e.target as HTMLElement;

          if (t.closest('a')) {
            setOpen(false);
          }
        }}
      >
        <div className={s.panelTop}>
          <NavLink to="/" className={s.panelLogo} aria-label="Nice Gadgets">
            <img src={Logo} alt="logo" />
          </NavLink>

          <button
            className={s.panelClose}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <img src={CloseBurgerMenu} alt="" aria-hidden="true" />
          </button>
        </div>

        <ul className={s.panelNav}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? s.mLinkActive : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? s.mLinkActive : undefined
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? s.mLinkActive : undefined
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? s.mLinkActive : undefined
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className={s.panelBottom}>
          <NavLink to="/favorites" className={s.panelIcon}>
            <img src={Heart} alt="" aria-hidden="true" />
          </NavLink>
          <NavLink to="/cart" className={s.panelIcon}>
            <img src={Cart} alt="" aria-hidden="true" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
