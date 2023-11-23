import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import PageNavLink from '../PageNavLink/PageNavLink';
import './Header.scss';
import LOGO from '../../icons/LOGO.svg';
import favourites from '../../icons/Favourites.svg';
import cart from '../../icons/Cart.svg';
import { useAppSelector } from '../../features/hooks';
import Search from '../Search/Search';
import MenuMobile from '../MenuMobile/MenuMobile';

const Header = () => {
  const [isOpenMenu, setIsOPenMenu] = useState(false);
  const pagesNames = ['phones', 'tablets', 'accessories', 'favorites'];
  const pathName = useLocation().pathname;
  const pageName = pathName.split('/').pop();
  const showFilters = pagesNames.includes(pageName || '');

  const { items } = useAppSelector(state => state.cart);
  const totalCount = items.reduce((sum, item) => item.count + sum, 0);
  const favoritesItems = useAppSelector(state => state.favorites.items);

  const onToogleMenu = () => {
    setIsOPenMenu(!isOpenMenu);
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__left-side">
          <Link to="/">
            <img
              src={LOGO}
              alt="logo"
              className="logo"
            />
          </Link>
          <div className="open-menu">
            <button
              aria-label="open-menu"
              type="button"
              className="open-menu__button"
              onClick={() => onToogleMenu()}
            />
          </div>
          {isOpenMenu && <MenuMobile />}
          <nav className="nav">
            <PageNavLink to="/" text="Home" />
            <PageNavLink to="phones" text="Phones" />
            <PageNavLink to="tablets" text="Tablets" />
            <PageNavLink to="accessories" text="Accessories" />
          </nav>
        </div>
        <div className="header__right-side">
          {showFilters && (<Search title={pageName} />)}
          <NavLink
            to="/cart"
            className={({ isActive }) => classNames('header__link', {
              'header__link--active': isActive,
            })}
          >
            <img
              className="icon"
              src={cart}
              alt=""
            />
            {totalCount <= 0 ? (
              <div />
            ) : (
              (<div className="header__icon--count">{totalCount}</div>)
            )}
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => classNames('header__link', {
              'header__link--active': isActive,
            })}
          >
            <img
              className="icon"
              src={favourites}
              alt=""
            />
            {favoritesItems.length <= 0 ? (
              <div />
            ) : (
              <div className="header__icon--count">{favoritesItems.length}</div>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
