import {
  Link, NavLink, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import './Header.scss';
import { useEffect, useState } from 'react';
import { Product, Cart } from '../../types';

type Props = {
  favorites: Product[],
  carts: Cart[],
  handleSetQuery: (value: string) => void;
  query: string,
};

const ActiveLinkClassName = ({ isActive }: { isActive: boolean }) => cn(
  'link',
  { 'is-active': isActive },
);

const wichPage = (inputString: string) => {
  const stringWithoutFirstTwoChars = inputString.substring(2);

  const indexOfSlash = stringWithoutFirstTwoChars.indexOf('/');

  if (indexOfSlash !== -1) {
    const stringWithoutSlashAndAfter
    = stringWithoutFirstTwoChars.slice(0, indexOfSlash);

    return stringWithoutSlashAndAfter;
  }

  const indexOfQuestionMark = stringWithoutFirstTwoChars.indexOf('?');

  if (indexOfQuestionMark !== -1) {
    const stringWithoutQuestionMarkAndAfter
    = stringWithoutFirstTwoChars.slice(0, indexOfQuestionMark);

    return stringWithoutQuestionMarkAndAfter;
  }

  return stringWithoutFirstTwoChars;
};

export const Header:React.FC<Props> = ({
  favorites, carts, handleSetQuery, query,
}) => {
  const [page, Setpage] = useState<string>(window.location.hash);

  const location = useLocation();

  useEffect(() => {
    Setpage(wichPage(window.location.hash));
  }, [location]);

  return (
    <header>
      <nav className="navigation">
        <div className="navigation-links">
          <ul className="navigation-links__links">
            <li className="navigation-links__img">
              <NavLink
                to="/"
              >
                <img src="./img/icons/logo.svg" alt="#logo" />
              </NavLink>
            </li>
            <li className="navigation-links__link">
              <NavLink
                className={ActiveLinkClassName}
                to="/"
              >
                HOME
              </NavLink>
            </li>
            <li className="navigation-links__link">
              <NavLink
                className={ActiveLinkClassName}
                to="/phones"
              >
                PHONES
              </NavLink>
            </li>
            <li className="navigation-links__link">
              <NavLink
                className={ActiveLinkClassName}
                to="/tablets"
              >
                TABLETS
              </NavLink>
            </li>
            <li className="navigation-links__link">
              <NavLink className={ActiveLinkClassName} to="/accessories">
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navigation-icons">
          {(page === 'tablets' || page === 'phones'
          || page === 'accessories' || page === 'favorites')
          && (
            <div className="search-container">
              <input
                type="text"
                className="search"
                placeholder={`Search in ${page}...`}
                value={query}
                onChange={(e) => handleSetQuery((e.target.value))}
              />
              {query ? (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => (handleSetQuery(''))}
                  data-cy="searchDelete"
                >
                  <img
                    className="seach-icon cearch-container__search-icon"
                    src="./img/icons/icons_close.svg"
                    alt="#search-icon"
                  />
                </button>

              ) : (
                <img
                  className="seach-icon cearch-container__search-icon"
                  src="./img/icons/search.svg"
                  alt="#search-icon"
                />
              )}
            </div>
          )}
          <Link to="/favorites" className="navigation-icon">
            {favorites.length > 0 && (
              <div className="counter">
                {favorites.length}
              </div>
            )}
            <img src="./img/icons/heartlike.svg" alt="#Favourites" />
          </Link>

          <Link to="/cart" className="navigation-icon">
            {carts.length > 0 && (
              <div className="counter">
                {carts.reduce(
                  (accumulator, cart) => accumulator + cart.quantity, 0,
                )}
              </div>
            )}
            <img src="./img/icons/cart.svg" alt="#Cart" />
          </Link>
        </div>
      </nav>
    </header>
  );
};
