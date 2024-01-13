/* eslint-disable max-len */
import {
  NavLink, useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { useContext } from 'react';
import { getSearchWith } from '../helpers/searchHelper';
import { ProductsContext } from './ProductsContext';

export const Navbar: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean; }) => {
    return isActive
      ? 'navbar-item active active::after'
      : 'navbar-item';
  };

  const { pathname, search } = useLocation();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const bagPathname = () => {
    if (pathname === '/') {
      return 'CartPage';
    }

    if (pathname.includes('CartPage')) {
      return pathname;
    }

    return `${pathname}/CartPage`;
  };

  function setSearchWith(params: any) {
    const s = getSearchWith(searchParams, params);

    setSearchParams(s);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  const {
    favIds, cartIds,
  } = useContext(ProductsContext);

  const totalCount = cartIds.map(arr => arr[1]).reduce((sum, cur) => sum + cur, 0);

  return (
    <nav className="navbar">
      <NavLink to="/" className={getLinkClass}>
        <img className="navbar__logo" src="icons/logo.svg" alt="logo" />
      </NavLink>

      {pathname !== '/bag' && (
        <div className="navbar__links" data-cy="categoryLinksContainer">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accesories" className={getLinkClass}>
            Accesories
          </NavLink>
        </div>
      )}

      <div className="navbar__right">
        {pathname.slice(1) === category && pathname !== '/bag' && (
          <>
            <div className="navbar__search">
              <input
                className="navbar__search-input"
                placeholder={`Search in ${pathname.slice(1)}...`}
                value={query}
                onChange={handleQueryChange}
              />

              {query
                ? (
                  <svg
                    onClick={() => setSearchWith({ query: null })}
                    className="navbar__search-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.47138C12.7319 4.21103 12.7319 3.78892 12.4716 3.52858C12.2112 3.26823 11.7891 3.26823 11.5288 3.52858L8.00016 7.05717L4.47157 3.52858C4.21122 3.26823 3.78911 3.26823 3.52876 3.52858C3.26841 3.78892 3.26841 4.21103 3.52876 4.47138L7.05735 7.99998L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.94279L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99998L12.4716 4.47138Z" fill="#313237" />
                  </svg>
                )
                : <img className="navbar__search-svg" src="icons/search.svg" alt="search" />}
            </div>
          </>
        )}

        <NavLink to="favorites" className={getLinkClass}>
          <div className="navbar__icons">
            <img className="navbar__icons-svg" src="icons/favorites.svg" alt="favorite" />
            {favIds.length && (
              <div className="navbar__icons-counter">
                <span className="navbar__icons-counter--num">
                  {favIds.length}
                </span>
              </div>
            )}
          </div>
        </NavLink>

        <NavLink
          to={{ pathname: bagPathname(), search }}
          className={getLinkClass}
        >
          <div className="navbar__icons">
            <img className="navbar__icons-svg" src="icons/bag.svg" alt="bag" />
            {cartIds.length && (
              <div className="navbar__icons-counter">
                <span className="navbar__icons-counter--num">
                  {totalCount}
                </span>
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
