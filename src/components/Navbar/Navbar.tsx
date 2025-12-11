import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../images/Logo.png';
import menuBatton from '../../images/icons/menu-batton.png';
import close from '../../images/icons/Close.png';
import favouritesIcon from '../../images/icons/favourites-heart-like.png';
import shoppingBag from '../../images/icons/shopping-bag.png';
import { useContext } from 'react';
import { DevicesContext, DevicesContextType } from '../../DevicesContext';
import classNames from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] || 'home';
  const context = useContext<DevicesContextType | undefined>(DevicesContext);

  if (!context) {
    return null;
  }

  const { isMobile, navMenuList, favourites, cart } = context;

  return (
    <div className="top-bar" id="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo__header" />
      </div>

      {isMobile ? (
        <div className="nav">
          {pathname !== '/aside' ? (
            <Link to={'aside'} className="nav__menu">
              <img
                src={menuBatton}
                alt="menu batton"
                className="nav__menu__icon"
              />
            </Link>
          ) : (
            <Link to={'/'} className="nav__menu">
              <img src={close} alt="menu batton" className="nav__menu__icon" />
            </Link>
          )}
        </div>
      ) : (
        <div className="nav">
          <div className="nav__list">
            <ul className="nav__menu-list">
              {navMenuList.map(el => (
                <li
                  className={classNames('nav__menu-list__block-item', {
                    'nav__menu-list__block-item--selected': basePath === el,
                  })}
                  key={el}
                >
                  <Link
                    to={el === 'home' ? '/' : `/${el}`}
                    className="nav__menu-list__item"
                  >
                    {el}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__items">
            <Link to={'favourites'} className="nav__items__icon">
              <div className="icon-wrapper">
                <img
                  src={favouritesIcon}
                  alt="favourites"
                  className="nav__items__image"
                />

                {favourites.length > 0 && (
                  <span className="icon-badge">{favourites.length}</span>
                )}
              </div>
            </Link>

            <Link to={'cart'} className="nav__items__icon">
              <div className="icon-wrapper">
                <img
                  src={shoppingBag}
                  alt="shopping bag"
                  className="nav__items__image"
                />

                {Object.keys(cart).length > 0 && (
                  <span className="icon-badge">{Object.keys(cart).length}</span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
