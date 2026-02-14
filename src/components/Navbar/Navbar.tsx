import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import './Navbar.scss';
import debounce from 'debounce';
import { NavLink, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../context/CatalogContext';
import { PageLink } from './PageLink/PageLink';
import { getSearchWith } from '../../utils/service';
import { FavCartLink } from './FavCartLink/FavCartLink';
import { Search } from './Search/Search';
import * as Types from '../../types';

export const Navbar = () => {
  const { menuIsActive, handleLinkClick, query, setQuery } =
    useContext(CatalogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || Types.PerPage.All;

  const setSearchWith = useCallback(
    (params: Types.SearchParams) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const debouncedSearch = debounce((value: string) => {
    if (value.trim() === '') {
      setSearchWith({ query: null });
    } else {
      setSearchWith({
        page: perPage === Types.PerPage.All ? null : '1',
        query: value,
      });
    }
  }, 1000);

  const handleClearQuery = () => {
    if (query) {
      setQuery('');
      setSearchWith({
        page: perPage === Types.PerPage.All ? null : '1',
        query: null,
      });
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <nav className={classNames('nav', { nav__menu: menuIsActive })}>
      <section
        className={classNames('nav__leftBlock', {
          'nav__leftBlock--menu': menuIsActive,
        })}
      >
        <NavLink to="/" onClick={() => handleLinkClick(false)}>
          <div
            className={classNames('icon icon__logo icon__logo--nav', {
              'icon__logo--nav-menu': menuIsActive,
            })}
          />
        </NavLink>

        <div className="nav__leftBlock--search-menu-container">
          <article className="nav__leftBlock--search-menu-container-hidden">
            <Search
              query={query}
              onQueryChange={handleQueryChange}
              onClearQuery={handleClearQuery}
            />
          </article>

          <article
            className={classNames('icon', {
              icon__close: menuIsActive,
              icon__menu: !menuIsActive,
            })}
            onClick={() => handleLinkClick(!menuIsActive)}
          />
        </div>
      </section>

      <section
        className={classNames('nav__rightBlock', {
          'nav__rightBlock--menu': menuIsActive,
        })}
      >
        <article
          className={classNames('nav__rightBlock--left', {
            'nav__rightBlock--left-menu': menuIsActive,
          })}
        >
          <PageLink
            name={Types.PageName.Home}
            handleClearQuery={handleClearQuery}
          />
          <PageLink
            name={Types.PageName.Phones}
            handleClearQuery={handleClearQuery}
          />
          <PageLink
            name={Types.PageName.Tablets}
            handleClearQuery={handleClearQuery}
          />
          <PageLink
            name={Types.PageName.Accessories}
            handleClearQuery={handleClearQuery}
          />
        </article>

        <article
          className={classNames('nav__rightBlock--right', {
            'nav__rightBlock--right-menu': menuIsActive,
          })}
        >
          <div
            className={classNames({
              'nav__rightBlock--search-hidden': menuIsActive,
            })}
          >
            <Search
              query={query}
              onQueryChange={handleQueryChange}
              onClearQuery={handleClearQuery}
            />
          </div>

          <FavCartLink
            name={Types.PageName.Favourites}
            handleClearQuery={handleClearQuery}
          />
          <FavCartLink name={Types.PageName.Cart} />
        </article>
      </section>
    </nav>
  );
};
