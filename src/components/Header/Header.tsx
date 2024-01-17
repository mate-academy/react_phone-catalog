import './Header.scss';

import { useCallback, useContext, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import classNames from 'classnames';

import { NavBar } from '../NavBar';
import { getSearchWith } from '../../utils/searchHelper';
import { PageContext } from '../../utils/GlobalContext';

export const Header = () => {
  const {
    favorietsList,
    totalNumber,
  } = useContext(PageContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const location = useLocation().pathname;
  const [showNavBar, setShowNavBar] = useState(false);

  const getPlaceholderLocation = () => {
    let result = '';

    for (let i = 1; i < location.length; i += 1) {
      result += location[i];
    }

    return result;
  };

  const placeholderLocation = getPlaceholderLocation();

  const applyQuery = useCallback(
    debounce(setSearchParams, 500),
    [setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    applyQuery(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  const handleQueryCancel = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );

    setQuery('');
  };

  const getFavClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'header__icon',
      'has-left-shadow',
      'header__icon--favoriets',
      { 'header__icon--active': isActive },
    );
  };

  const getBagClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'header__icon',
      'has-left-shadow',
      'header__icon--shopping-bag',
      { 'header__icon--active': isActive },
    );
  };

  return (
    <header className="header has-bottom-shadow">
      <div className="header__left-side">
        <Link to="/" className="header__logo" />

        <div className="header__nav-descktop">
          {location !== '/cart'
            && <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />}
        </div>
      </div>

      {showNavBar
        && (
          <div className="header__nav-bar">
            <button
              type="button"
              aria-label="close menu"
              className="header__nav-bar-close"
              onClick={() => setShowNavBar(false)}
            />
            <NavBar showNavBar={showNavBar} setShowNavBar={setShowNavBar} />
          </div>
        )}

      <div className="header__right-side">
        {(
          location === '/phones'
          || location === '/tablets'
          || location === '/accessories'
          || location === '/favouriets'
        )
          && (
            <div className="header__search-bar has-left-shadow">
              <input
                type="text"
                className="header__search-query"
                placeholder={`Search in ${placeholderLocation}...`}
                value={query}
                onChange={handleQueryChange}
              />

              {query
                ? (
                  <button
                    aria-label="cancel-query"
                    className="header__search-icon header__search-icon--cancel"
                    type="button"
                    onClick={handleQueryCancel}
                    data-cy="searchDelete"
                  />
                ) : (
                  <button
                    aria-label="search-query"
                    className="header__search-icon header__search-icon--search"
                    type="button"
                  />
                )}
            </div>
          )}

        {location !== '/cart' && (
          <div className="header__icon-container">
            <NavLink
              to="/favouriets"
              className={getFavClass}
            />
            <NavLink
              to="/favouriets"
              className="header__circle-accounter"
            >
              {favorietsList.length}
            </NavLink>
          </div>
        )}

        <div className="header__icon-container">
          <NavLink
            to="/cart"
            className={getBagClass}
          />
          <NavLink
            to="/cart"
            className="header__circle-accounter"
          >
            {totalNumber}
          </NavLink>
        </div>

        <button
          type="button"
          aria-label="icon menu"
          className="header__icon header__icon--menu has-left-shadow"
          onClick={() => setShowNavBar(true)}
        />
      </div>
    </header>
  );
};
