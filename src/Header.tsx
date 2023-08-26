import { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from './Context';
import {
  getCartItemsFromLocaleStorage,
  getFavouritesFromLocaleStorage,
} from './utils/updateLocaleStorage';

type Props = {
  filterType: string,
  filterQuery: string | null,
  updateSearch(params: {
    [key: string]: number[] | string[] | string | null
  }): void,
};

export const Header: React.FC<Props> = ({
  filterType,
  filterQuery,
  updateSearch,
}) => {
  const {
    query,
    setQuery,
  } = useContext(Context);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      updateSearch({ query: event.target.value });
    } else {
      updateSearch({ query: null });
    }
  };

  useMemo(() => {
    if (filterQuery) {
      setQuery(filterQuery);
    }
  }, [filterQuery]);

  return (
    <header className="header" id="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li>
            <NavLink
              className="header__link"
              to="/home"
            >
              <div className="header__image" />
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
              to="/"
            >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
              to="/phones"
            >
              PHONES
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
              to="/tablets"
            >
              TABLETS
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => classNames(
                'header__link',
                { 'header__link--active': isActive },
              )}
              to="/accessories"
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>

        <div className="header__container">
          <input
            className={classNames('header__filter', {
              'header__filter--active': filterType !== '',
            })}
            type="text"
            placeholder={`Search in ${filterType}...`}
            disabled={filterType === ''}
            value={query}
            onChange={handleInputChange}
          />
          <NavLink
            className={({ isActive }) => classNames(
              'header__button header__favourites',
              { 'header__favourites--active': isActive },
            )}
            to="/favourites"
          >
            <div className="header__stroke" />
            {getFavouritesFromLocaleStorage('favourites').length > 0 && (
              <div className="header__circle">
                {getFavouritesFromLocaleStorage('favourites').length}
              </div>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) => classNames(
              'header__button header__cart',
              { 'header__cart--active': isActive },
            )}
            to="/cart"
          >
            <div className="header__bag" />
            {getCartItemsFromLocaleStorage('toBuy').length > 0 && (
              <div className="header__circle">
                {getCartItemsFromLocaleStorage('toBuy').length}
              </div>
            )}
          </NavLink>
        </div>
      </nav>

      <div className="header__cover" />
    </header>
  );
};
