import React, { useCallback, useState } from 'react';
import './header.scss';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../images/Logo.svg';
import { NamesByHeader } from '../../types/NamesByHeader';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/SearchParams';
import { getState } from '../../helpers/getState';
import { NamesByLinks } from '../../types/NamesByLinks';
import { DEF_SORT } from '../../helpers/consts';
import { debounce } from '../../helpers/debounce';

type Props = {
  withNavigate?: boolean,
  withSearchBy?: string,
  quantityLiked?: number,
  quantityAdded?: number,
  onSetIsMenu?: (isMenu: boolean) => void,
  isMenu?: boolean,
};

export const Header: React.FC<Props> = ({
  withNavigate = true,
  withSearchBy = '',
  quantityLiked = 0,
  quantityAdded = 0,
  onSetIsMenu = () => { },
  isMenu = false,
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

  const handlerClickMenu = () => {
    if (isMenu) {
      onSetIsMenu(false);
    } else {
      onSetIsMenu(true);
    }
  };

  const debounceSearch = useCallback(debounce((
    oldSearchParams: URLSearchParams, newQuery: string,
  ) => {
    const newParams = { query: newQuery || null };

    setSearchParams(getSearchWith(oldSearchParams, newParams));
  }, 1000), []);

  const handlerQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setDebounceQuery(newQuery);
    debounceSearch(searchParams, newQuery);
  };

  const handlerDeleteQuery = () => {
    setDebounceQuery('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <header id="header" className="header">
      <div className="header__left">
        <div className="header__logo">
          <Link to="/" className="header__nav-link">
            <img
              src={logo}
              alt="logo-img"
              className="logo-img"
            />
          </Link>
        </div>

        {withNavigate && (
          <nav className="header__nav nav">
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
        {withSearchBy && (
          <div className="header__form">
            <input
              className="header__input"
              placeholder={`Search in ${withSearchBy}...`}
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

        <button
          type="button"
          aria-label="button open menu"
          className={classNames(
            'header__square-link',
            { header__menu: !isMenu },
            { header__close: isMenu },
          )}
          onClick={handlerClickMenu}
        />

        <NavLink
          to={NamesByLinks.Favourites}
          state={getState(pathname, search)}
          className={getClassForFavourites}
        >
          {quantityLiked !== 0 && (
            <p className="header__small-quantity">
              {quantityLiked}
            </p>
          )}

        </NavLink>

        <NavLink
          to={NamesByLinks.Cart}
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
