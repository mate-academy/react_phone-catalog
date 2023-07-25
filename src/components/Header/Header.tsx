import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PageNavLink } from '../../helpers/PageNavLink';
import { AppContext } from '../../context/AppContextProvider';
import { SearchBar } from '../SearchBar/SearchBar';
import { PathnamesApp, PathnamesForNav } from '../../types/Pathnames';
import { IconMenu } from '../IconMenu/IconMenu';
import './header.scss';

const linkAddress = (pageName: string) => {
  return pageName === 'Home' ? '/' : pageName.toLowerCase();
};

export const Header: React.FC = () => {
  const { favorites, cart } = useContext(AppContext);
  const { pathname } = useLocation();
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const pathnameNormalized = pathname.substring(1);
  const isSearchBarShown = Object.keys(PathnamesForNav)
    .some(path => path.toLowerCase() === pathnameNormalized);

  useEffect(() => {
    setIsMenuOpened(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  localStorage.clear();

  return (
    <>
      <div
        id="header"
        className="header"
      >
        <div className="header__content">
          <Link to={PathnamesApp.Home} className="header__logo" />
          <div className="nav">
            {Object.keys(PathnamesForNav).map(item => (
              <PageNavLink
                key={item}
                text={item}
                to={linkAddress(item)}
              />
            ))}
          </div>
        </div>
        <div className="header__container">
          {isSearchBarShown && <SearchBar />}
          <IconMenu
            link={PathnamesApp.Favorites}
            count={favorites.length}
            iconName="favorites"
          />
          <IconMenu
            link={PathnamesApp.Cart}
            count={cart.length}
            iconName="cart"
          />
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="header__menu-open-button"
            onClick={toggleMenu}
          />
        </div>
      </div>
      <nav className={classNames(
        'header__menu',
        { header__menu_opened: isMenuOpened },
      )}
      >
        <div className="header__box">
          <Link to={PathnamesApp.Home} className="header__logo" />
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className="header__menu-open-button"
            onClick={toggleMenu}
          />
        </div>
        <div className="nav">
          {Object.keys(PathnamesForNav).map(item => (
            <PageNavLink
              key={item}
              text={item}
              to={linkAddress(item)}
            />
          ))}
        </div>
        <div className="header__container">
          <IconMenu
            link={PathnamesApp.Favorites}
            count={favorites.length}
            iconName="favorites"
          />
          <IconMenu
            link={PathnamesApp.Cart}
            count={cart.length}
            iconName="cart"
          />
        </div>
      </nav>
    </>
  );
};
