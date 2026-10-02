/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import styles from './Header.module.scss';

const navItems = [
  ['/', 'Home'],
  ['/phones', 'Phones'],
  ['/tablets', 'Tablets'],
  ['/accessories', 'Accessories'],
];

export function Header() {
  const { cart, favorites } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isCatalog = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(location.pathname);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} to="/" aria-label="Nice Gadgets home">
        NICE GADGETS
      </NavLink>
      <nav className={styles.nav}>
        {navItems.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'}>
            {label}
          </NavLink>
        ))}
      </nav>
      {isCatalog && (
        <label className={styles.search}>
          <span>⌕</span>
          <input
            aria-label="Search products"
            placeholder="Search in products..."
            value={new URLSearchParams(location.search).get('query') || ''}
            onChange={({ target }) => {
              const params = new URLSearchParams(location.search);

              target.value
                ? params.set('query', target.value)
                : params.delete('query');
              navigate({ search: params.toString() }, { replace: true });
            }}
          />
        </label>
      )}
      <div className={styles.actions}>
        <NavLink aria-label="Favorites" to="/favorites">
          <span>♡</span>
          {favorites.length > 0 && <b>{favorites.length}</b>}
        </NavLink>
        <NavLink aria-label="Cart" to="/cart">
          <span className={styles.bag}>▢</span>
          {count > 0 && <b>{count}</b>}
        </NavLink>
      </div>
    </header>
  );
}
