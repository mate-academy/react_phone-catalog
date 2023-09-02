import classNames from 'classnames';
import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './Navbar.scss';
import debounce from 'lodash.debounce';
import { StoragesContext } from '../../Context/StoragesContext';

const getActiveTitle = ({ isActive }: { isActive: boolean }) => (
  classNames('titles__link', { 'titles__link--is-active': isActive })
);

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { likesStorage, cartStorage } = useContext(StoragesContext);
  const { pathname } = useLocation();
  const [debQuery, setDebQuery] = useState(searchParams.get('query') || '');

  const isVisibleSearch = pathname === '/phones' || pathname === '/favorites'
    || pathname === '/tablets' || pathname === '/accessories';

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
            placeholder="Search in phones..."
            value={debQuery}
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

          {!debQuery && <i className="search__find" />}

        </div>

        <div className="icon__container">
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames(
              'icon icon--heart',
              { 'icon--is-active': isActive },
            )}
          >
            {likesStorage.length > 0 && (
              <span className="fav-qnty">
                <p className="fav-qnty__num">
                  {likesStorage.length}
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
