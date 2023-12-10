/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { LogoLink } from '../LogoLink';
import { ProductsContext } from '../../context/ProductsContext';

export const Header = () => {
  const { pathname } = useLocation();
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const [isTabCard, setIsTabCard] = useState(false);
  const { favourites, cart } = useContext(ProductsContext);

  const isLinkActive = (isActive: boolean) => {
    return cn('header__nav-link', {
      active: isActive,
    });
  };

  useEffect(() => {
    if (pathname === '/cart') {
      setIsTabCard(true);
    } else {
      setIsTabCard(false);
    }

    if (['/phones', '/tablets', '/accessories', '/favourites']
      .includes(pathname)) {
      setSearchPlaceholder(pathname.slice(1));
    } else {
      setSearchPlaceholder('');
    }
  }, [pathname]);

  return (
    <header className="header" id="top">
      <div className="header__left">
        <LogoLink />
        {!isTabCard && (
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <NavLink
                  to="/"
                  className={isActive => isLinkActive(isActive.isActive)}
                >
                  Home
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="phones"
                  className={isActive => isLinkActive(isActive.isActive)}
                >
                  Phones
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="tablets"
                  className={isActive => isLinkActive(isActive.isActive)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="header__nav-item">
                <NavLink
                  to="accessories"
                  className={isActive => isLinkActive(isActive.isActive)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="header__right">
        {searchPlaceholder && (
          <div className="header__search">
            <input
              type="text"
              className="header__search-input"
              placeholder={`Search in ${searchPlaceholder}...`}
            />
            {/* eslint-disable-next-line react/button-has-type */}
            <button className="header__search-button">
              <img
                src="icons/search.svg"
                alt="search"
                className="header__search-icon"
              />
            </button>
          </div>
        )}
        {!isTabCard && (
          <div className="header__user-choice">
            <Link
              to="favourites"
              className="header__user-choice-link"
            >
              <img
                src="icons/heart.svg"
                alt="cart"
                className="header__user-choice-icon"
              />
              {!!favourites.length && (
                <span className="header__user-choice-count">
                  {favourites.length}
                </span>
              )}
            </Link>
          </div>
        )}
        <div className="header__user-choice">
          <Link
            to="cart"
            className="header__user-choice-link"
          >
            <img
              src="icons/bag.svg"
              alt="cart"
              className="header__user-choice-icon"
            />
            {!!cart.length && (
              <span className="header__user-choice-count">{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
