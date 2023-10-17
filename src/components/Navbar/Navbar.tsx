import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './Navbar.scss';
import debounce from 'lodash.debounce';
import { useAppSelector } from '../../store/hooks';

const getActiveTitle = ({ isActive }: { isActive: boolean }) => (
  classNames('titles__link', { 'titles__link--is-active': isActive })
);

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favStorage } = useAppSelector(state => state.favorite);
  const { cartStorage } = useAppSelector(state => state.cart);
  const { pathname } = useLocation();
  const [debQuery, setDebQuery] = useState(searchParams.get('query') || '');
  const focusSearch = useRef<HTMLInputElement | null>(null);

  const handleFocusOnSearch = () => {
    if (focusSearch.current) {
      focusSearch.current.focus();
    }
  };

  const isVisibleSearch = pathname === '/phones' || pathname === '/favorites'
    || pathname === '/tablets' || pathname === '/accessories';

  const searchTitle = isVisibleSearch
    && pathname[1].toUpperCase() + pathname.slice(2);

  const applyQuery = useCallback(debounce(setSearchParams, 1000), [pathname]);

  useEffect(() => {
    setDebQuery(searchParams.get('query') || '');
  }, [pathname]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebQuery(event.target.value);
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    params.set('query', event.target.value);

    if (!event.target.value.trim()) {
      params.delete('query');
    }

    applyQuery(params);
  };

  const handleClearSearchBar = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');

    setSearchParams(params);
    setDebQuery('');
  };

  return (
    <>
      <nav className="nav">
        <div className="titles">
          <ul className="titles__list">
            <li className="titles__item titles__item--underline">
              <NavLink
                to="/"
                className={getActiveTitle}
              >
                home
              </NavLink>
            </li>

            <li className="titles__item titles__item--underline">
              <NavLink
                to="/phones"
                className={getActiveTitle}
              >
                phones
              </NavLink>
            </li>

            <li className="titles__item titles__item--underline">
              <NavLink
                to="/tablets"
                className={getActiveTitle}
              >
                tablets
              </NavLink>
            </li>

            <li className="titles__item titles__item--underline">
              <NavLink
                to="/accessories"
                className={getActiveTitle}
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="header__container-right">
        <div
          className={classNames(
            'search',
            { 'search--is-shown': isVisibleSearch },
          )}
        >
          <input
            type="search"
            placeholder={`Search in ${searchTitle}...`}
            value={debQuery}
            ref={focusSearch}
            onChange={handleInput}
            className="search__input search__input--underline"
          />

          {debQuery && (
            <button
              type="button"
              aria-label="clear"
              className="search__clear"
              onClick={() => handleClearSearchBar()}
            />
          )}

          {!debQuery && (
            <button
              type="button"
              aria-label="search"
              onClick={() => handleFocusOnSearch()}
              className="search__find"
            />
          )}

        </div>

        <div className="icon__container">
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames(
              'icon icon--heart',
              { 'icon--is-active': isActive },
            )}
          >
            {favStorage.length > 0 && (
              <span className="fav-qnty">
                <p className="fav-qnty__num">
                  {favStorage.length}
                </p>
              </span>
            )}
          </NavLink>
        </div>

        <div className="icon__container">
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'icon icon--cart',
              { 'icon--is-active': isActive },
            )}
          />

          {cartStorage.length > 0 && (
            <span className="fav-qnty">
              <p className="fav-qnty__num">
                {cartStorage.length}
              </p>
            </span>
          )}
        </div>
      </div>
    </>
  );
};
