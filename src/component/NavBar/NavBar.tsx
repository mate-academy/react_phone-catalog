import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { useContext, useState } from 'react';
import { ProductContext } from '../../ProductContext';
import { PathName } from '../../enums';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

const getLinckClass = (
  { isActive }: { isActive: boolean },
) => cn({
  active: isActive,
});

export const NavBar = () => {
  const {
    cartItems,
    favourites,
  } = useContext(ProductContext);

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActive, setIsActive] = useState<boolean>(false);

  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParams) {
    const search: string = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
    searchParams.set('query', event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setSearchWith({ query: event.currentTarget.value || null });
      searchParams.set('query', event.currentTarget.value);
    }
  }

  const clearQuery = () => {
    setIsActive(false);
    setSearchWith({ query: null });
  };

  return (
    <nav className="nav">
      <NavLink
        to="/"
        className="nav__logo"
      />

      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            className={`nav__link ${getLinckClass}`}
          >
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/phones"
            className={`nav__link ${getLinckClass}`}
          >
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/tablets"
            className={`nav__link ${getLinckClass}`}
          >
            Tables
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            to="/accessories"
            className={`nav__link ${getLinckClass}`}
          >
            Accessories
          </NavLink>
        </li>
      </ul>

      <div className="nav__wrap">
        {Object.values(PathName).includes(pathname as PathName) && (
          <div className="nav__search">
            <input
              type="text"
              className="nav__search__input"
              placeholder={`Search in ${pathname.slice(1)}...`}
              value={query}
              onChange={handleQueryChange}
              onClick={() => setIsActive(true)}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              className="nav__search__btn"
              onClick={() => clearQuery()}
            >
              <img
                src={isActive ? './icon/Close.svg' : './icon/Search.svg'}
                alt={isActive ? 'Close' : 'Search'}
              />
            </button>

          </div>
        )}

        <NavLink
          to="/favourites"
          className={`nav__icon ${getLinckClass}`}
        >
          {!!favourites.length && (
            <span className="nav__icon__counter">
              {favourites.length}
            </span>
          )}
          <img src="./icon/Heart.svg" alt="Heart" />
        </NavLink>

        <NavLink
          to="/card"
          className={`nav__icon ${getLinckClass}`}
        >
          {!!cartItems.length && (
            <span className="nav__icon__counter">
              {cartItems.length}
            </span>
          )}
          <img src="./icon/basket.svg" alt="Basket" />
        </NavLink>
      </div>
    </nav>
  );
};
