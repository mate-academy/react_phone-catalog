import React, { useCallback, useState } from 'react';
import './header.scss';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import logo from '../../images/Logo.svg';
import { NamesByHeader } from '../../types/NamesByHeader';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/SearchParams';
import { getState } from '../../helpers/getState';
import { NamesByLinks } from '../../types/NamesByLinks';
import { DEF_SORT } from '../../helpers/consts';

type Props = {
  withNavigate?: boolean,
  withSearch?: string,
  quantityLiked?: number,
  quantityAdded?: number,
};

export const Header: React.FC<Props> = ({
  withNavigate = true,
  withSearch = '',
  quantityLiked = 0,
  quantityAdded = 0,
}) => {
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const [debounceQuery, setDebounceQuery] = useState(query);

  const getClassForLeftTabs = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'nav__link',
      'header__nav-link',
      { 'header__is-active': isActive },
    );
  };

  const getClassForFavourites = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'header__square-link',
      'header__favourites',
      { 'header__is-active': isActive },
    );
  };

  const getClassForCart = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'header__square-link',
      'header__shopping-bag',
      { 'header__is-active': isActive },
    );
  };

  const debounceSearch = useCallback(debounce((newQuery: string) => {
    const newParams = { query: newQuery || null };

    setSearchParams(getSearchWith(searchParams, newParams));
  }, 1000), []);

  const handlerQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setDebounceQuery(newQuery);
    debounceSearch(newQuery);
  };

  const handlerDeleteQuery = () => {
    setDebounceQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <header id="header" className="header">
      <div className="header__left">
        <Link to="/" className="header__nav-link">
          <img
            src={logo}
            alt="logo-img"
            className="logo-img"
          />
        </Link>

        {withNavigate && (
          <nav className="nav">
            <ul className="nav__list">
              <li className="header__nav-item nav__item">
                <NavLink to="/" end className={getClassForLeftTabs}>
                  {NamesByHeader.Home}
                </NavLink>
              </li>

              <li className="header__nav-item nav__item">
                <NavLink
                  to={NamesByLinks.Phones + DEF_SORT}
                  end
                  className={getClassForLeftTabs}
                >
                  {NamesByHeader.Phones}
                </NavLink>
              </li>

              <li className="header__nav-item nav__item">
                <NavLink
                  to={NamesByLinks.Tablets + DEF_SORT}
                  end
                  className={getClassForLeftTabs}
                >
                  {NamesByHeader.Tablets}
                </NavLink>
              </li>

              <li className="header__nav-item nav__item">
                <NavLink
                  to={NamesByLinks.Accessories + DEF_SORT}
                  end
                  className={getClassForLeftTabs}
                >
                  {NamesByHeader.Accessories}
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div className="header__right">
        {withSearch && (
          <div className="header__form">
            <input
              className="header__input"
              placeholder={`Search in ${withSearch}...`}
              value={debounceQuery}
              onChange={handlerQueryChange}
            />

            <div className="header__form--button">
              {!query.length ? (
                <div className="header__form--search" />
              ) : (
                <button
                  type="button"
                  aria-label="button delete query"
                  onClick={handlerDeleteQuery}
                  className="header__form--close"
                  data-cy="searchDelete"
                />
              )}
            </div>
          </div>
        )}

        <NavLink
          to="/favourites"
          className={getClassForFavourites}
        >
          {quantityLiked !== 0 && (
            <p className="header__small-quantity">
              {quantityLiked}
            </p>
          )}

        </NavLink>

        <NavLink
          to="/shopping-bag"
          state={getState(pathname, search)}
          className={getClassForCart}
        >
          {quantityAdded !== 0 && (
            <p className="header__small-quantity">
              {quantityAdded}
            </p>
          )}
        </NavLink>
      </div>
    </header>
  );
};
