import { useState, useContext, useMemo, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

import './index.scss';
import cn from 'classnames';
import { Navbar } from '../Navbar/Navbar';
import { StateStore } from '../../store/StoreContext';
import { ICONS } from '../../images';

const getLinkLogoClass = ({ isActive }: { isActive: boolean }) =>
  cn('header__bar-right__icon--logo--link', {
    'header__bar-right__icon--logo--link--active': isActive,
  });

export const Header = () => {
  const { products } = useContext(StateStore);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    switch (pathname) {
      case '/phones':
        setIsQuery(true);
        setPlaceholder('Search in phones...');
        break;

      case '/tablets':
        setIsQuery(true);
        setPlaceholder('Search in tablets...');
        break;

      case '/accessories':
        setIsQuery(true);
        setPlaceholder('Search in accessories...');
        break;

      case '/favorites':
        setIsQuery(true);
        setPlaceholder('Search in favorites...');
        break;

      default:
        setIsQuery(false);
        setPlaceholder('');
    }

    setQuery(searchParams.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const favorites = products.filter(item => item.addedToFavorites === true);
  const carts = products.filter(item => item.addedToCart === true);

  const debouncedQuery = useMemo(
    () =>
      debounce(value => {
        if (!value.trim()) {
          searchParams.delete('query');
        } else {
          searchParams.set('query', value.trim());
        }

        setSearchParams(searchParams);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  return (
    <header className="header">
      <div className="header__bar-left">
        <Navbar />
      </div>

      <div className="header__bar-right">
        {isQuery && (
          <div className="header__bar-right__search">
            <input
              type="text"
              className="header__bar-right__search__query"
              placeholder={placeholder}
              value={query}
              onChange={queryChangeHandler}
            />
            {query.length ? (
              <button
                data-cy="searchDelete"
                type="button"
                className="header__bar-right__search--button"
                onClick={clearQuery}
              >
                <img
                  src={ICONS.close}
                  alt="Clear search"
                  className="header__bar-right__search--icon"
                />
              </button>
            ) : (
              <img
                src={ICONS.search}
                alt="Search"
                className="header__bar-right__search--icon"
              />
            )}
          </div>
        )}

        <div className="header__bar-right__icon">
          <NavLink to="/favorites" className={getLinkLogoClass}>
            <img
              src={ICONS.favorite}
              alt="Favorites"
              className="header__bar-right__icon__logo"
            />

            {!!favorites.length && (
              <div className="header__bar-right__icon__counter">
                {favorites.length}
              </div>
            )}
          </NavLink>
        </div>

        <div className="header__bar-right__icon">
          <NavLink to="/cart" className={getLinkLogoClass}>
            <img
              src={ICONS.cart}
              alt="Cart"
              className="header__bar-right__icon__logo"
            />

            {!!carts.length && (
              <div className="header__bar-right__icon__counter">
                {carts.length}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
