import classNames from 'classnames';
import './Header.scss';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { getSearchWith } from '../../helpers/getSearchWith';
import { debounce } from '../../helpers/debounce';

export const Header = () => {
  const { cartProducts, favorites } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const location = useLocation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav-link nav__link', {
      'nav__link--is-active': isActive,
    });

  const applieQuery = useCallback(debounce(setSearchParams, 1000), [
    setSearchParams,
  ]);

  const handleQueryChange = (value: string) => {
    const newSearchParams = getSearchWith(
      { query: value || null, page: '1' },
      searchParams,
    );

    setQuery(value);
    applieQuery(newSearchParams);
  };

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__right-side">
          <Link to="/" className="header__logo logo">
            <img src="Logo.svg" alt="logo" className="logo__image" />
          </Link>
          <nav className="header__nav nav">
            <NavLink to="/" className={getLinkClass}>
              home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              accessories
            </NavLink>
          </nav>
        </div>
        <div className="header__left-side">
          {(location.pathname === '/phones' ||
            location.pathname === '/tablets' ||
            location.pathname === '/accessories' ||
            location.pathname === '/favorites') && (
            <label htmlFor="search" className="header__label">
              <input
                value={query}
                aria-label="search"
                type="text"
                className="header__input"
                onChange={ev => handleQueryChange(ev.target.value)}
                placeholder={`Search in ${location.pathname.slice(1)}...`}
              />
              {!query ? (
                <button
                  aria-label="search"
                  type="button"
                  className="header__icon-img icon icon--search"
                />
              ) : (
                <button
                  aria-label="close"
                  type="button"
                  className="header__icon-img icon icon--close"
                  onClick={() => handleQueryChange('')}
                />
              )}
            </label>
          )}
          <Link to="/favorites" className="header__icon header__icon--tablet">
            <div className="header__icon-img icon--favourites">
              {favorites.length > 0 && (
                <span className="header__count">{favorites.length}</span>
              )}
            </div>
          </Link>
          <Link to="/cart" className="header__icon header__icon--tablet">
            <div className="header__icon-img icon--cart">
              {cartProducts.length > 0 && (
                <span className="header__count">{cartProducts.length}</span>
              )}
            </div>
          </Link>
          {location.pathname === '/menu' ? (
            <Link to="/" className="header__icon header__icon--phone">
              <div className="header__icon-img icon--close" />
            </Link>
          ) : (
            <Link to="menu" className="header__icon header__icon--phone">
              <div className="header__icon-img icon--menu" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
