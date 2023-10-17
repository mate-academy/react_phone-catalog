import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from './Context';
import { useUpdateSearch } from './utils/hooks';
import {
  getCartItemsFromLocaleStorage,
  getFavouritesFromLocaleStorage,
} from './utils/updateLocaleStorage';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';

type Props = {
  filterType: string,
  filterQuery: string | null,
};

export const Header: React.FC<Props> = ({
  filterType,
  filterQuery,
}) => {
  const {
    query,
    setQuery,
  } = useContext(Context);
  const { updateSearch } = useUpdateSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      updateSearch({ query: event.target.value });
    } else {
      updateSearch({ query: null });
    }
  };

  useEffect(() => {
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
              to="/#"
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
            {getFavouritesFromLocaleStorage(
              LocaleStorageTypes.favourites,
            ).length > 0 && (
              <div className="header__circle">
                {getFavouritesFromLocaleStorage(
                  LocaleStorageTypes.favourites,
                ).length}
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
            {getCartItemsFromLocaleStorage(
              LocaleStorageTypes.toBuy,
            ).length > 0 && (
              <div className="header__circle">
                {getCartItemsFromLocaleStorage(
                  LocaleStorageTypes.toBuy,
                ).length}
              </div>
            )}
          </NavLink>
        </div>
      </nav>

      <div className="header__cover" />
    </header>
  );
};
