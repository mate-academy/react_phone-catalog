import {
  useCallback,
  useEffect,
  useState,
//  useContext
} from 'react';
import { debounce } from 'lodash';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useUpdateSearch } from './utils/hooks';
import {
  getCartItemsFromLocaleStorage,
  getFavouritesFromLocaleStorage,
} from './utils/updateLocaleStorage';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';
import { SearchTypes } from './types/SearchTypes';
// import { Context } from './Context';

export const Header: React.FC = () => {
  // const {
  //   chosenProducts,
  //   productsToBuy,
  // } = useContext(Context);
  const { pathname } = useLocation();
  const { updateSearch } = useUpdateSearch();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const filterQuery = searchParams.get(SearchTypes.query) || '';

  const handleLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        updateSearch({ query: event.target.value });
      } else {
        updateSearch({ query: null });
      }
    }, 1000,
  );

  const delay = useCallback(handleInputChange, [pathname]);

  useEffect(() => {
    if (!filterQuery) {
      setQuery('');
    } else {
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
              'header__filter--active': pathname.slice(1) !== ''
              && pathname.split('/').length !== 3,
            })}
            type="text"
            placeholder={`Search in ${pathname.split('/')[1]}...`}
            disabled={pathname.slice(1) === ''}
            value={query}
            onChange={(event) => {
              handleLocalChange(event);
              delay(event);
            }}
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
