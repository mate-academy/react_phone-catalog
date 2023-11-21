import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import styles from './Header.module.scss';
import favoritesIcon from '../../img/icons/Favourites.svg';
import cartIcon from '../../img/icons/Cart.svg';
import Search from '../../img/icons/Search.svg';
import Close from '../../img/icons/Close.svg';

import { useProducts } from '../../Store';
import { NavBar } from '../NavBar';

export const Header: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams
    .get('query') || '');
  const pathnameArr = useLocation().pathname.split('/');
  const carrPage = pathnameArr[pathnameArr.length - 1];
  const pagesHasSearch: { [key: string]: boolean } = {
    phones: true,
    tablets: true,
    accessories: true,
    favourites: true,
    default: false,
  };
  const isShowSearch = pagesHasSearch[carrPage] || pagesHasSearch.default;
  const favoritesCount = useProducts(state => state.favouritesProducts.length);
  const cartCount = useProducts(state => state.cartProducts.length);
  const handleSearchRequest = useMemo(() => debounce((value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', value.trim());

    if (!value.trim()) {
      params.delete('query');
    }

    setSearchParams(params);
  }, 500), [searchParams]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearchRequest(e.target.value);
  };

  const cleanSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    setSearchParams(params);
    setSearchValue('');
  };

  useEffect(() => {
    setSearchValue('');
  }, [useLocation().pathname]);

  return (
    <header className={styles.header}>
      <NavBar />
      <div className={styles.rightBlock}>
        {isShowSearch && (
          <form action="#" className={styles.rightBlockForm}>
            <label>
              <input
                type="text"
                placeholder={`Search in ${carrPage}...`}
                onChange={handleSearch}
                value={searchValue}
              />
            </label>
            {searchValue ? (
              <button type="button" onClick={cleanSearch}>
                <img
                  src={Close}
                  alt="close"
                />
              </button>
            ) : (
              <img src={Search} alt="search" />
            )}
          </form>
        )}

        <NavLink
          to="/favourites"
          className={({ isActive }) => classNames([styles.rightBlockIconsItem],
            {
              [styles.rightBlockIconsItemActive]: isActive,
            })}
        >
          <img src={favoritesIcon} alt="favorites" />
          {!!favoritesCount && (
            <span className={styles.rightBlockCount}>{favoritesCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => classNames([styles.rightBlockIconsItem],
            {
              [styles.rightBlockIconsItemActive]: isActive,
            })}
        >
          <img src={cartIcon} alt="favorites" />
          {!!cartCount && (
            <span className={styles.rightBlockCount}>{cartCount}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
