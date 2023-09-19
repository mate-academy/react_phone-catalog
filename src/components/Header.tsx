import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { Logo } from './Logo';
import { useFavouritesContext } from '../context/FavouritesContext';
import { useCartContext } from '../context/CartContext';

interface Options {
  isActive: boolean
}

const PAGES_WITH_SEARCH = ['/phones', '/tablets', '/accessories', '/favorites'];

const getLinkClass = ({ isActive }: Options) => classNames('header__link', {
  'header__link--active': isActive,
});

export const Header = () => {
  const { favourites } = useFavouritesContext();
  const { cart } = useCartContext();
  const [query, setQuery] = useState('');
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';

    setQuery(searchQuery);
  }, [pathname]);

  const handleQueryDelete = () => {
    setQuery('');

    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      handleQueryDelete();

      return;
    }

    setQuery(event.target.value);

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  return (
    <div className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <Logo />
        </div>

        {pathname !== '/cart' && (
          <ul className="header__nav_menu">
            <li>
              <NavLink to="/" className={getLinkClass}>
                <span className="header__nav_link">
                  home
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/phones" className={getLinkClass} end>
                <span className="header__nav_link">
                  phones
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/tablets" className={getLinkClass} end>
                <span className="header__nav_link">
                  tablets
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/accessories" className={getLinkClass} end>
                <span className="header__nav_link">
                  accessories
                </span>
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      <div className="header__search-icons">
        {PAGES_WITH_SEARCH.includes(pathname) && (
          <div className="header__search">
            <input
              type="text"
              placeholder={`Search in ${pathname.slice(1)}...`}
              className="header__search-input"
              value={query}
              onChange={handleQueryChange}
            />

            <button
              type="button"
              className={classNames(
                'header__search-button',
                { 'header__search-button--clear': !!query },
              )}
              aria-label="search button"
              data-cy="searchDelete"
              onClick={handleQueryDelete}
            />
          </div>
        )}

        {pathname !== '/cart' && (
          <NavLink to="/favorites" className={getLinkClass}>
            <span
              className={classNames(
                'header__icons header__icons--favorites',
                { 'header__icons--zero': favourites.length !== 0 },
              )}
              data-content={favourites.length}
            />
          </NavLink>
        )}

        <NavLink to="/cart" className={getLinkClass}>
          <span
            className={classNames(
              'header__icons header__icons--cart',
              { 'header__icons--zero': cart.length !== 0 },
            )}
            data-content={cart.length}
          />
          {/* <span className="header__icons header__icons--cart" /> */}
        </NavLink>
      </div>
    </div>
  );
};
