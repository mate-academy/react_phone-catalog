import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Header.module.scss';

import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { NavPosition } from '../../types/NavPositionType';
import { Navigation } from '../Navigation';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/SearchParams';
import { CategorySrc } from '../../types/Categorys';
import debounce from 'lodash.debounce';
import { ItemsIconCounter } from '../ItemsCounterIcon';

type Props = {
  checkMenu: boolean;
  menuPage: React.Dispatch<React.SetStateAction<boolean>>;
  getLinkClass?: (
    { isActive }: { isActive: boolean },
    styles: CSSModuleClasses,
  ) => string;
};

export const Header: React.FC<Props> = ({
  checkMenu,
  menuPage,
  getLinkClass,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [applyedQuery, setApplyedQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const applyQuery = useCallback(debounce(setApplyedQuery, 800), []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value.trim());
  };

  const pageSrc = useLocation().pathname;

  const searchedPathName: CategorySrc[] = [
    '/phones',
    '/tablets',
    '/accessories',
  ];

  const searchInput = useMemo(() => {
    if (searchedPathName.includes(pageSrc as CategorySrc)) {
      return true;
    } else {
      return false;
    }
  }, [pageSrc]);

  useEffect(() => {
    setSearchParams(
      getSearchWith({ query: applyedQuery || null }, searchParams),
    );
  }, [applyedQuery]);

  return (
    <div className={styles.header}>
      <div className={styles.topContainer}>
        <div className={styles.headerContent}>
          <div className={styles.headerLogo}>
            <Link to="/" className="logo logo--header"></Link>
          </div>
          <div className={styles.headerNav}>
            <Navigation navPosition={NavPosition.header} />
          </div>
        </div>

        {searchInput && (
          <div className={styles.search}>
            <input
              type="text"
              value={query}
              ref={inputRef}
              className={styles.searchInput}
              onChange={handleQueryChange}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  removeFocus();
                }
              }}
              placeholder="Search"
            />
          </div>
        )}

        <div className={styles.headerIcons}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              classNames(getLinkClass ? getLinkClass({ isActive }, styles) : '')
            }
          >
            <div className={styles.headerIcon}>
              <div className="counter">
                <ItemsIconCounter icon={'favourites'} />
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(getLinkClass ? getLinkClass({ isActive }, styles) : '')
            }
          >
            <div className={styles.headerIcon}>
              <div className="counter">
                <ItemsIconCounter icon={'cart'} />
              </div>
            </div>
          </NavLink>

          {checkMenu ? (
            <div className={styles.headerClose}>
              <button
                className="icon close"
                onClick={() => {
                  menuPage(false);
                }}
              />
            </div>
          ) : (
            <div className={styles.headerBurgerMenu}>
              <button className="icon menu" onClick={() => menuPage(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
