// src/components/Header/Header.tsx - Main header component with navigation
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import s from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useDebouncedValue } from '../../utils/useDebouncedValue';

const CATALOG_PREFIXES = ['/phones', '/tablets', '/accessories'];

export const Header: React.FC = () => {
  const { totalQty } = useCart();
  const { count } = useFavorites();

  const location = useLocation();
  const [params, setParams] = useSearchParams();

  const isCatalog = useMemo(
    () => CATALOG_PREFIXES.some(p => location.pathname.startsWith(p)),
    [location.pathname],
  );

  const urlQuery = params.get('query') ?? '';
  const [searchInput, setSearchInput] = useState(urlQuery);
  const debounced = useDebouncedValue(searchInput, 500);

  useEffect(() => {
    setSearchInput(urlQuery);
  }, [urlQuery, location.pathname]);

  useEffect(() => {
    if (!isCatalog) {
      return;
    }

    const next = new URLSearchParams(params);

    if (debounced && debounced !== '') {
      next.set('query', debounced);
    } else {
      next.delete('query');
    }

    next.set('page', '1');
    setParams(next, { replace: true });
  }, [debounced, isCatalog, params, setParams]);

  return (
    <header className={s.root}>
      <div className={`container ${s.inner}`}>
        <Link to="/" className={s.brand}>
          PhoneCatalog
        </Link>

        <nav className="nav">
          <NavLink to="/phones">Phones</NavLink>
          <NavLink to="/tablets">Tablets</NavLink>
          <NavLink to="/accessories">Accessories</NavLink>
        </nav>

        {isCatalog && (
          <div className={s.searchWrap}>
            <input
              type="search"
              placeholder="Search…"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className={s.search}
              aria-label="Search products"
            />
          </div>
        )}

        <div className={s.counters}>
          <NavLink to="/favorites">
            ❤ <span className={s.badge}>{count}</span>
          </NavLink>
          <NavLink to="/cart">
            🛒 <span className={s.badge}>{totalQty}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
