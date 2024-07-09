import React, { useContext, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import './Header.scss';
import {
  bagImg,
  closeImg,
  favouritesImg,
  logoImg,
  menuImg,
  searchImg,
} from '../../utils/indes';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { StateProduct } from '../../context/ProductContext';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getStylelinkNav = ({ isActive }: { isActive: boolean }) => {
  return classNames('nav__link', {
    ['activeHeader']: isActive,
  });
};

const getStylelinkActions = ({ isActive }: { isActive: boolean }) => {
  return classNames('actions__link', {
    ['activeHeader']: isActive,
  });
};

const Header: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { products } = useContext(StateProduct);
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [isQuery, setIsQuery] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    switch (pathname) {
      case '/phones':
        setIsQuery(true);
        setPlaceholder(`Search in ${pathname.replace('/', '')}...`);
        break;

      case '/tablets':
        setIsQuery(true);
        setPlaceholder(`Search in ${pathname.replace('/', '')}...`);
        break;

      case '/accessories':
        setIsQuery(true);
        setPlaceholder(`Search in ${pathname.replace('/', '')}...`);
        break;

      default:
        setIsQuery(false);
        setPlaceholder('');
    }

    setQuery(searchParams.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const debouncedQuery = useMemo(
    () =>
      debounce((value: string) => {
        const updatedSearchParams = new URLSearchParams(searchParams);

        if (!value.trim()) {
          updatedSearchParams.delete('query');
        } else {
          updatedSearchParams.set('query', value.trim());
        }

        setSearchParams(updatedSearchParams);
      }, 500),
    [searchParams, setSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    debouncedQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  const quantities = carts.map(item => item.quantity);
  const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0);

  return (
    <header className="header">
      <Link
        to="/"
        className="header__logo"
        onClick={() => setIsMenuOpen(false)}
      >
        <img src={logoImg} alt="Logo" className="header__logo-img" />
      </Link>

      <div className="navContainer">
        <nav className="nav">
          <NavLink to="/" className={getStylelinkNav}>
            Home
          </NavLink>
          <NavLink to="phones" className={getStylelinkNav}>
            Phones
          </NavLink>
          <NavLink to="tablets" className={getStylelinkNav}>
            Tablets
          </NavLink>
          <NavLink to="accessories" className={getStylelinkNav}>
            Accessories
          </NavLink>
        </nav>

        <div className="actionsContainer">
          <div className="actions">
            {isQuery && (
              <div className="actions__search">
                <div className="actions__search-block">
                  <input
                    type="text"
                    className="actions__search-block-query"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleQueryChange}
                  />
                  {query.length ? (
                    <button
                      data-cy="searchDelete"
                      type="button"
                      className="actions__search-block-button"
                      onClick={clearQuery}
                    >
                      <img
                        src={closeImg}
                        alt="Clear search"
                        className="actions__search-block-icon"
                      />
                    </button>
                  ) : (
                    <img
                      src={searchImg}
                      alt="Search"
                      className="actions__search-block-icon"
                    />
                  )}
                </div>
              </div>
            )}
            <NavLink to="favourites" className={getStylelinkActions}>
              <img
                src={favouritesImg}
                alt="FavouritesImg"
                className="actions__link-img"
              />

              {!!favourites.length && (
                <span className="actions__link-counter">
                  <p className="actions__link-counter-text">
                    {favourites.length}
                  </p>
                </span>
              )}
            </NavLink>

            <NavLink to="cart" className={getStylelinkActions}>
              <img src={bagImg} alt="BagImg" className="actions__link-img" />

              {!!carts.length && (
                <span className="actions__link-counter">
                  <p className="actions__link-counter-text">{totalQuantity}</p>
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      <div className="menu">
        <button type="button" className="menu__button" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeImg : menuImg} alt="menu" />
        </button>
      </div>
      <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
